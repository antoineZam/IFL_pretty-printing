const axios = require('axios');
const queries = require('./startggQueries');

// start.gg API configuration
const STARTGG_API_URL = 'https://api.start.gg/gql/alpha';
const STARTGG_API_KEY = process.env.STARTGG_API_KEY;

if (!STARTGG_API_KEY) {
  console.warn('WARNING: STARTGG_API_KEY is not defined in your .env file.');
  console.warn('start.gg API integration will not work without an API key.');
  console.warn('Get your API key from: https://developer.start.gg/');
}

// ============================================================
// RESPONSE CACHE
//
// Every start.gg call is a network round-trip to a rate-limited third party,
// and the Top 8 overlay re-polls the same bracket every 20s while a control
// page is usually polling it too. Two layers sit in front of the API:
//
//   * in-flight coalescing -- identical concurrent requests share one HTTP
//     call. No staleness whatsoever.
//   * a short TTL cache, sized per data type: seconds for live scores,
//     minutes for structural data (phase layout, tournament listings) that
//     does not change during a broadcast.
// ============================================================

const TTL = {
  LIVE:       5 * 1000,        // bracket sets / standings mid-tournament
  STRUCTURE: 10 * 60 * 1000,   // phase groups, event layout
  LISTING:    5 * 60 * 1000,   // league + tournament listings
};

const responseCache = new Map();  // key -> { value, expiresAt }
const inFlight      = new Map();  // key -> Promise

function withCache(key, ttlMs, producer) {
  const hit = responseCache.get(key);
  if (hit && hit.expiresAt > Date.now()) return Promise.resolve(hit.value);

  const pending = inFlight.get(key);
  if (pending) return pending;

  const promise = Promise.resolve()
    .then(producer)
    .then(value => {
      responseCache.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    })
    .finally(() => { inFlight.delete(key); });

  inFlight.set(key, promise);
  return promise;
}

/** Drops every cached start.gg response. Called after a sync writes new data. */
function clearCache() {
  responseCache.clear();
}

// GraphQL query helper
function queryStartGG(query, variables = {}) {
  if (!STARTGG_API_KEY) {
    return Promise.reject(new Error('STARTGG_API_KEY is not configured'));
  }
  // Coalesce identical concurrent queries onto a single request.
  const key = `gql:${query}:${JSON.stringify(variables)}`;
  const pending = inFlight.get(key);
  if (pending) return pending;

  const promise = executeStartGGQuery(query, variables)
    .finally(() => { inFlight.delete(key); });
  inFlight.set(key, promise);
  return promise;
}

async function executeStartGGQuery(query, variables) {
  try {
    const response = await axios.post(
      STARTGG_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STARTGG_API_KEY}`
        }
      }
    );

    if (response.data.errors) {
      throw new Error(`start.gg GraphQL errors: ${JSON.stringify(response.data.errors)}`);
    }

    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`start.gg API error: ${error.response.status} ${error.response.statusText}`);
    }
    console.error('Error querying start.gg API:', error);
    throw error;
  }
}

// Get tournament by slug
async function getTournamentBySlug(slug) {
  return await queryStartGG(queries.tournament.bySlug, { slug });
}

/**
 * Narrows a list of start.gg events to one, by slug.
 *
 * start.gg event slugs are full paths ("tournament/x/event/y"), but callers pass
 * either that or the bare event segment, so both are accepted. Returns the list
 * unchanged when no filter is given, and an empty list when the filter matches
 * nothing -- never silently "all events", which is what the old code did by
 * dropping the argument entirely.
 */
function filterEventsBySlug(events, eventSlug) {
  if (!eventSlug) return events;
  const wanted = String(eventSlug).replace(/^\/+|\/+$/g, '').toLowerCase();
  return events.filter(e => {
    const full = String(e.slug || '').toLowerCase();
    return full === wanted || full.endsWith(`/${wanted}`) || full.split('/').pop() === wanted;
  });
}

/**
 * Get a tournament's events.
 *
 * @param {string} slug        tournament slug
 * @param {object} [options]
 * @param {string} [options.eventSlug]   restrict to a single event
 * @param {boolean} [options.includeSets] also paginate every set of every event
 *
 * `includeSets` defaults to false. It used to be unconditional, so listing a
 * tournament's event names fired hundreds of start.gg calls with 100 ms sleeps
 * between them and could take minutes -- for a caller that only wanted names.
 * Only the sync needs the sets.
 */
async function getTournamentEvents(slug, options = {}) {
  const { eventSlug = null, includeSets = false } = typeof options === 'string'
    ? { eventSlug: options }   // tolerate the old positional call shape
    : options;

  const data = await queryStartGG(queries.tournament.events, { slug });

  if (data && data.tournament && Array.isArray(data.tournament.events)) {
    data.tournament.events = filterEventsBySlug(data.tournament.events, eventSlug);
  }

  // Now fetch all sets for each event with pagination
  if (includeSets && data && data.tournament && data.tournament.events) {
    for (const event of data.tournament.events) {
      console.log(`    Fetching all matches for event: ${event.name}...`);
      event.sets = { nodes: [] };
      
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        try {
          const setsData = await getEventSetsByEventId(event.id, page, 50);
          
          if (setsData && setsData.event && setsData.event.sets) {
            const sets = setsData.event.sets;
            event.sets.nodes = event.sets.nodes.concat(sets.nodes || []);
            
            const totalPages = sets.pageInfo?.totalPages || 1;
            hasMore = page < totalPages;
            page++;
            
            // Avoid rate limiting
            if (hasMore) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } else {
            hasMore = false;
          }
        } catch (e) {
          console.log(`    ⚠ Error fetching page ${page}: ${e.message}`);
          hasMore = false;
        }
      }
      
      console.log(`    ✓ Fetched ${event.sets.nodes.length} matches for ${event.name}`);
    }
  }
  
  return data;
}

// Get sets by event ID with match details
async function getEventSetsByEventId(eventId, page = 1, perPage = 20) {
  return await queryStartGG(queries.event.sets, { eventId, page, perPage });
}

// Get player information from start.gg
async function getPlayerInfo(playerSlug) {
  return await queryStartGG(queries.player.info, { slug: playerSlug });
}

/**
 * Get tournament participants/entrants with full player info.
 *
 * Walks every page of entrants. The query used to hardcode page 1 / perPage 100
 * with no loop here, so in any event above 100 entrants everybody past the first
 * page never received a sponsor or country and their overlay flag stayed blank.
 *
 * `eventSlug` narrows the returned events -- the underlying query declares only
 * $slug, so that filter is applied to the response rather than pushed down.
 */
const PARTICIPANTS_PER_PAGE = 100;
const PARTICIPANTS_MAX_PAGES = 50;   // 5,000 entrants; a guard, not an expected limit

async function getTournamentParticipants(slug, eventSlug = null) {
  const first = await queryStartGG(queries.tournament.participants, {
    slug, page: 1, perPage: PARTICIPANTS_PER_PAGE,
  });

  if (!first || !first.tournament || !Array.isArray(first.tournament.events)) {
    return first;
  }

  if (eventSlug) {
    first.tournament.events = filterEventsBySlug(first.tournament.events, eventSlug);
  }

  // Entrants paginate per event, and every event shares one page cursor in this
  // query -- so walk until no event reports another page, merging by entrant id.
  const maxTotalPages = Math.max(
    1,
    ...first.tournament.events.map(e => e.entrants?.pageInfo?.totalPages || 1)
  );
  const pagesToFetch = Math.min(maxTotalPages, PARTICIPANTS_MAX_PAGES);
  if (maxTotalPages > PARTICIPANTS_MAX_PAGES) {
    console.warn(`start.gg: ${slug} has ${maxTotalPages} entrant pages; stopping at ${PARTICIPANTS_MAX_PAGES}.`);
  }

  for (let page = 2; page <= pagesToFetch; page++) {
    const next = await queryStartGG(queries.tournament.participants, {
      slug, page, perPage: PARTICIPANTS_PER_PAGE,
    });
    const nextEvents = next?.tournament?.events ?? [];

    for (const event of first.tournament.events) {
      const match = nextEvents.find(e => e.id === event.id);
      const nodes = match?.entrants?.nodes ?? [];
      if (nodes.length === 0) continue;

      const seen = new Set(event.entrants.nodes.map(n => n.id));
      for (const node of nodes) {
        if (!seen.has(node.id)) {
          event.entrants.nodes.push(node);
          seen.add(node.id);
        }
      }
    }
  }

  return first;
}

// Get upcoming/past tournaments for a tournament series (like "iron-fist-league")
async function getTournamentSeries(slug, upcoming = true, past = true) {
  // Note: start.gg doesn't have a direct "series" endpoint
  // You'll need to search for tournaments with similar slugs
  return await queryStartGG(queries.tournament.series, { slug });
}

// Search for tournaments by name/term.
//
// This used to run the unfiltered `search.tournaments` query -- which accepts
// only perPage and carries no name filter -- and then filter the result locally.
// That fetched the 50 most recent tournaments on all of start.gg, so the target
// was virtually never in the window and the search returned nothing for almost
// any term. `tournamentsByName` pushes the filter to the server.
//
// The local pass is kept as a widening step only: start.gg's filter matches on
// name, so a slug-shaped term ("iron-fist-league-2") is normalized to spaces and
// also matched against the slug of whatever the server did return.
async function searchTournaments(searchTerm, perPage = 50) {
  try {
    const term = searchTerm.trim();
    if (!term) return { tournaments: { nodes: [] } };

    // start.gg's name filter does not understand hyphenated slugs; try the term
    // as typed first, then its spaced form.
    const spacedTerm = term.replace(/-/g, ' ');
    const attempts = spacedTerm === term ? [term] : [term, spacedTerm];

    const byId = new Map();
    for (const attempt of attempts) {
      const data = await queryStartGG(queries.search.tournamentsByName, { term: attempt, perPage });
      for (const node of data?.tournaments?.nodes ?? []) {
        byId.set(node.id, node);
      }
      if (byId.size > 0) break;
    }

    return { tournaments: { nodes: [...byId.values()] } };
  } catch (error) {
    console.error('Error in searchTournaments:', error);
    throw error;
  }
}

// Search for Iron Fist League Season 2 tournaments specifically
// ONLY returns tournaments where slug starts with 'iron-fist-league-2'
function searchIronFistLeagueTournaments(maxResults = 50) {
  return withCache(`ifl-search:${maxResults}`, TTL.LISTING, () =>
    searchIronFistLeagueTournamentsUncached(maxResults));
}

async function searchIronFistLeagueTournamentsUncached(maxResults = 50) {
  const allTournaments = [];
  const seenIds = new Set();

  // Search with multiple terms to find all potential matches.
  // The three searches are independent, so they run together rather than
  // stacking three sequential round-trips.
  const searchTerms = ['Iron Fist League', 'IFL', 'iron fist'];

  const responses = await Promise.all(searchTerms.map(term =>
    queryStartGG(queries.search.tournamentsByName, { term })
      .catch(e => {
        console.error(`  Error searching "${term}":`, e.message);
        return null;
      })
  ));

  for (const data of responses) {
    if (!data?.tournaments?.nodes) continue;
    for (const t of data.tournaments.nodes) {
      // STRICT FILTER: slug MUST start with 'iron-fist-league-2' (Season 2 tournaments)
      const slugLower = t.slug ? t.slug.toLowerCase() : '';
      const slugMatch = slugLower.startsWith(`tournament/${IFL_TOURNAMENT_BASE}`) ||
                       slugLower.startsWith(IFL_TOURNAMENT_BASE) ||
                       slugLower.includes(`/${IFL_TOURNAMENT_BASE}`);

      if (slugMatch && !seenIds.has(t.id)) {
        seenIds.add(t.id);
        allTournaments.push(t);
      }
    }
  }


  // Sort by startAt descending (most recent first)
  allTournaments.sort((a, b) => (b.startAt || 0) - (a.startAt || 0));

  return allTournaments;
}

// Get IFL Season 2 tournament by week/event identifier
// Examples: iron-fist-league-2-week-1, iron-fist-league-2-finals
async function getIFLTournamentByNumber(identifier, suffix = '') {
  // Build slug using Season 2 base
  const slugPatterns = [
    `${IFL_TOURNAMENT_BASE}-week-${identifier}${suffix ? `-${suffix}` : ''}`,
    `${IFL_TOURNAMENT_BASE}-${identifier}${suffix ? `-${suffix}` : ''}`
  ];
  
  for (const slug of slugPatterns) {
    try {
      const result = await getTournamentBySlug(slug);
      if (result && result.tournament) {
        console.log(`  ✓ Found IFL tournament with slug: ${slug}`);
        return result;
      }
    } catch (error) {
      console.log(`  ✗ Not found: ${slug}`);
    }
  }
  
  console.error(`Tournament not found with any pattern for identifier: ${identifier}`);
  return null;
}

// Get all sets (matches) for a tournament with full pagination.
// `eventSlug` restricts the walk to one event -- previously this parameter was
// accepted by the route and then dropped on the floor here.
async function getAllTournamentSets(slug, eventSlug = null) {
  // First get the tournament events
  const eventsData = await queryStartGG(queries.tournament.eventsBasic, { slug });
  
  if (!eventsData || !eventsData.tournament || !eventsData.tournament.events) {
    return [];
  }
  
  let allSets = [];
  const events = filterEventsBySlug(eventsData.tournament.events, eventSlug);
  
  // Fetch all sets for each event
  for (const event of events) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      try {
        const setsData = await getEventSetsByEventId(event.id, page, 50);
        
        if (setsData && setsData.event && setsData.event.sets && setsData.event.sets.nodes) {
          allSets = allSets.concat(setsData.event.sets.nodes);
          
          const totalPages = setsData.event.sets.pageInfo?.totalPages || 1;
          hasMore = page < totalPages;
          page++;
          
          // Avoid rate limiting
          if (hasMore) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } else {
          hasMore = false;
        }
      } catch (e) {
        console.error(`Error fetching sets for event ${event.id}:`, e.message);
        hasMore = false;
      }
    }
  }
  
  return allSets;
}

// IFL Configuration
const IFL_LEAGUE_SLUG = 'IFL2';  // Short slug for the league (https://www.start.gg/IFL2)
const IFL_TOURNAMENT_BASE = 'iron-fist-league-2';  // Season 2 base slug for all tournaments

// Get league standings from start.gg (includes rank and points)
function getLeagueStandings(leagueSlug = IFL_LEAGUE_SLUG, limit = 8) {
  return withCache(`league-standings:${leagueSlug}:${limit}`, TTL.LIVE, () =>
    getLeagueStandingsUncached(leagueSlug, limit));
}

async function getLeagueStandingsUncached(leagueSlug, limit) {
  try {
    const data = await queryStartGG(queries.league.standings, { 
      slug: leagueSlug, 
      page: 1, 
      perPage: limit 
    });
    
    if (!data || !data.league || !data.league.standings) {
      console.log('No standings data found for league:', leagueSlug);
      return [];
    }


    return data.league.standings.nodes.map(node => {
      // Get participant info from entrant
      const participant = node.entrant?.participants?.[0];
      const entrantName = node.entrant?.name || '';
      
      // Parse sponsor from entrant name (format: "SPONSOR | PlayerName")
      let username = participant?.gamerTag || entrantName;
      let sponsor = participant?.prefix || null;
      
      if (!sponsor && entrantName.includes(' | ')) {
        const parts = entrantName.split(' | ');
        sponsor = parts[0];
        username = parts.slice(1).join(' | ');
      }
      
      return {
        rank: node.placement,
        playerId: node.entrant?.id,
        username: username || 'Unknown',
        sponsor: sponsor,
        country: participant?.user?.location?.country || null,
        points: node.totalPoints || 0
      };
    });
  } catch (error) {
    console.error('Error fetching league standings:', error.message);
    throw error;
  }
}

// Get event standings from start.gg (top placements for a tournament event)
function getEventStandings(eventSlug, limit = 8) {
  return withCache(`event-standings:${eventSlug}:${limit}`, TTL.LIVE, () =>
    getEventStandingsUncached(eventSlug, limit));
}

async function getEventStandingsUncached(eventSlug, limit) {
  try {
    const data = await queryStartGG(queries.event.standings, { 
      slug: eventSlug, 
      page: 1, 
      perPage: limit 
    });
    
    if (!data || !data.event || !data.event.standings) {
      return [];
    }

    return data.event.standings.nodes.map(node => {
      const participant = node.entrant?.participants?.[0];
      const entrantName = node.entrant?.name || '';
      
      let username = participant?.gamerTag || entrantName;
      let sponsor = participant?.prefix || null;
      
      if (!sponsor && entrantName.includes(' | ')) {
        const parts = entrantName.split(' | ');
        sponsor = parts[0];
        username = parts.slice(1).join(' | ');
      }
      
      return {
        placement: node.placement,
        entrantId: node.entrant?.id,
        username: username || 'Unknown',
        sponsor: sponsor,
        country: participant?.user?.location?.country || null
      };
    });
  } catch (error) {
    console.error('Error fetching event standings:', error.message);
    return [];
  }
}

// Get Top 8 bracket data from start.gg
// Identifies the "Top 8" phase and only fetches sets from it
function getEventBracket(eventSlug, page = 1, perPage = 25) {
  return withCache(`event-bracket:${eventSlug}:${page}:${perPage}`, TTL.LIVE, () =>
    getEventBracketUncached(eventSlug, page, perPage));
}

// Which phase groups make up "Top 8" is fixed once the bracket is generated, so
// this lookup does not need to be repeated on every poll.
function getTop8PhaseGroupIds(eventSlug) {
  return withCache(`event-top8-phases:${eventSlug}`, TTL.STRUCTURE, async () => {
    const phasesData = await queryStartGG(queries.event.phases, { slug: eventSlug });
    const top8Phase = phasesData?.event?.phases?.find(p => /top\s*8/i.test(p.name));
    return top8Phase?.phaseGroups?.nodes?.length
      ? top8Phase.phaseGroups.nodes.map(pg => pg.id)
      : null;
  });
}

async function getEventBracketUncached(eventSlug, page, perPage) {
  try {
    // Find the Top 8 phase group IDs
    const phaseGroupIds = await getTop8PhaseGroupIds(eventSlug);

    const variables = { slug: eventSlug, page, perPage };
    if (phaseGroupIds) {
      variables.phaseGroupIds = phaseGroupIds;
    }

    const data = await queryStartGG(queries.event.bracket, variables);
    
    if (!data || !data.event) {
      return null;
    }

    const event = data.event;
    
    // Parse entrant info helper - includes score and country
    const parseEntrant = (slot) => {
      if (!slot?.entrant) return null;
      
      const entrantName = slot.entrant.name || '';
      
      let username = entrantName;
      let sponsor = null;
      
      if (entrantName.includes(' | ')) {
        const parts = entrantName.split(' | ');
        sponsor = parts[0];
        username = parts.slice(1).join(' | ');
      }
      
      // Get score from standing.stats.score.value (start.gg API structure)
      const rawScore = slot.standing?.stats?.score?.value ?? null;
      const score = rawScore != null ? Math.abs(rawScore) : null;
      
      // Get country from first participant's user location
      const country = slot.entrant.participants?.[0]?.user?.location?.country || null;
      
      return {
        id: slot.entrant.id,
        name: username || 'Unknown',
        sponsor: sponsor,
        score: score,
        country: country
      };
    };

    // Fallback: Parse scores from displayScore if API scores are null
    const parseScoresFromDisplay = (displayScore, player1, player2) => {
      if (!displayScore || displayScore === '-' || !player1 || !player2) return;
      if (player1.score !== null && player2.score !== null) return; // Already have scores
      
      // displayScore format: "PlayerName 3 - 1 PlayerName" or "3 - 1"
      const scoreMatch = displayScore.match(/(\d+)\s*-\s*(\d+)/);
      if (scoreMatch) {
        const parts = displayScore.split(/\s*-\s*/);
        if (parts.length >= 2) {
          const score1 = parseInt(parts[0].match(/(\d+)\s*$/)?.[1] || scoreMatch[1]);
          const score2 = parseInt(parts[1].match(/^\s*(\d+)/)?.[1] || scoreMatch[2]);
          if (player1.score === null) player1.score = score1;
          if (player2.score === null) player2.score = score2;
        }
      }
    };

    const sets = (event.sets?.nodes || []).map((set) => {
      const player1 = parseEntrant(set.slots?.[0]);
      const player2 = parseEntrant(set.slots?.[1]);
      parseScoresFromDisplay(set.displayScore, player1, player2);
      
      return {
        id: set.id,
        round: set.round,
        roundText: set.fullRoundText,
        displayScore: set.displayScore,
        state: set.state,
        winnerId: set.winnerId,
        player1,
        player2
      };
    });

    console.log(`[Top8] ${event.name} | ${sets.length} sets${phaseGroupIds ? ' (Top 8 phase)' : ' (all phases)'}`);

    return {
      id: event.id,
      name: event.name,
      state: event.state,
      numEntrants: event.numEntrants,
      sets,
      pageInfo: event.sets?.pageInfo || { total: 0, totalPages: 0 }
    };
  } catch (error) {
    console.error('Error fetching event bracket:', error.message);
    return null;
  }
}

// Get all tournaments/events in a league with participant counts
function getLeagueTournaments(leagueSlug = IFL_LEAGUE_SLUG, limit = 20) {
  return withCache(`league-tournaments:${leagueSlug}:${limit}`, TTL.LISTING, () =>
    getLeagueTournamentsUncached(leagueSlug, limit));
}

async function getLeagueTournamentsUncached(leagueSlug, limit) {
  try {
    const data = await queryStartGG(queries.league.eventsLight, { slug: leagueSlug });
    
    if (!data || !data.league || !data.league.events) {
      console.log('No events found for league:', leagueSlug);
      return [];
    }

    // Extract unique tournaments from events, keeping participant counts
    const tournamentsMap = new Map();
    
    for (const event of data.league.events.nodes) {
      const tournament = event.tournament;
      const tournamentSlug = tournament?.slug || event.slug.split('/event/')[0];
      const tournamentId = tournament?.id || event.id;
      
      if (!tournamentsMap.has(tournamentSlug)) {
        // Extract week number from tournament name or slug
        const weekMatch = (tournament?.name || event.name).match(/\[Week\s*(\d+)\]/i) ||
                         tournamentSlug.match(/-week-(\d+)/i) ||
                         (tournament?.name || event.name).match(/Week\s*(\d+)/i);
        const weekNumber = weekMatch ? parseInt(weekMatch[1]) : null;
        
        tournamentsMap.set(tournamentSlug, {
          id: tournamentId,
          name: tournament?.name || event.name,
          slug: tournamentSlug,
          eventSlug: event.slug,
          numAttendees: tournament?.numAttendees || event.numEntrants || 0,
          numEntrants: event.numEntrants || 0,
          startAt: tournament?.startAt || event.startAt || 0,
          weekNumber: weekNumber
        });
      }
    }

    // Sort by startAt (oldest first for chart display)
    const tournaments = Array.from(tournamentsMap.values())
      .sort((a, b) => (a.startAt || 0) - (b.startAt || 0))
      .slice(0, limit);

    return tournaments;
  } catch (error) {
    console.error('Error fetching league tournaments:', error.message);
    throw error;
  }
}

// Get league tournament stats for participation chart
async function getLeagueTournamentStats(leagueSlug = IFL_LEAGUE_SLUG, limit = 20) {
  const tournaments = await getLeagueTournaments(leagueSlug, limit);
  
  return tournaments.map(t => ({
    tournament_id: t.id,
    name: t.name,
    start_date: t.startAt ? new Date(t.startAt * 1000).toISOString() : null,
    status: 'completed',
    participant_count: t.numAttendees || t.numEntrants || 0,
    match_count: 0,
    week_number: t.weekNumber
  }));
}

// Get player's placements across tournaments in a league
async function getPlayerLeaguePlacements(leagueSlug, playerName, limit = 20) {
  try {
    const data = await queryStartGG(queries.league.events, { slug: leagueSlug });
    
    if (!data || !data.league || !data.league.events) {
      return [];
    }

    const placements = [];
    const normalizedPlayerName = playerName.toLowerCase().trim();

    for (const event of data.league.events.nodes) {
      if (!event.standings?.nodes) continue;
      
      for (const standing of event.standings.nodes) {
        const gamerTag = standing.entrant?.participants?.[0]?.gamerTag || standing.entrant?.name || '';
        const normalizedTag = gamerTag.toLowerCase().trim();
        
        // Check if this is the player we're looking for
        if (normalizedTag === normalizedPlayerName || 
            normalizedTag.includes(normalizedPlayerName) ||
            normalizedPlayerName.includes(normalizedTag)) {
          placements.push({
            eventId: event.id,
            eventName: event.name,
            tournamentName: event.tournament?.name || event.name,
            placement: standing.placement,
            slug: event.slug
          });
          break;
        }
      }
    }

    return placements.slice(0, limit);
  } catch (error) {
    console.error('Error fetching player placements:', error.message);
    return [];
  }
}

module.exports = {
  // Constants
  IFL_LEAGUE_SLUG,
  IFL_TOURNAMENT_BASE,
  // Functions
  getTournamentBySlug,
  getTournamentEvents,
  getEventSetsByEventId,
  getPlayerInfo,
  getTournamentParticipants,
  getTournamentSeries,
  searchTournaments,
  searchIronFistLeagueTournaments,
  getIFLTournamentByNumber,
  getAllTournamentSets,
  getLeagueStandings,
  getLeagueTournaments,
  getLeagueTournamentStats,
  getEventStandings,
  getEventBracket,
  getPlayerLeaguePlacements,
  queryStartGG,
  clearCache
};

