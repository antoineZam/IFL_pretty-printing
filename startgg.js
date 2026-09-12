const axios = require('axios');
const queries = require('./startggQueries');
const seasons = require('./iflSeasons');

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
  // Sits just above the overlay's 30 s fallback poll, so several open OBS
  // sources polling out of phase share one upstream fan-out. At 5 s every poll
  // was a guaranteed miss and re-walked up to five pages of start.gg, per source.
  LIVE:      15 * 1000,        // bracket sets / standings mid-tournament
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

// start.gg documents a cap near 80 requests/minute. The pagination loops sleep
// 100 ms between pages, which works out to roughly 600/min, so hitting the limit
// during a large sync is expected rather than exceptional -- and without this,
// the resulting failure landed in a swallowed-error path and looked like an
// event with no sets.
const RATE_LIMIT_MAX_RETRIES = 4;
const RATE_LIMIT_BASE_DELAY_MS = 1000;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function executeStartGGQuery(query, variables) {
  let lastError;

  for (let attempt = 0; attempt <= RATE_LIMIT_MAX_RETRIES; attempt++) {
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
          },
          timeout: 30000,
        }
      );

      if (response.data.errors) {
        throw new Error(`start.gg GraphQL errors: ${JSON.stringify(response.data.errors)}`);
      }

      return response.data.data;
    } catch (error) {
      const status = error.response?.status;
      const retryable = status === 429 || (status >= 500 && status < 600);

      if (!retryable || attempt === RATE_LIMIT_MAX_RETRIES) {
        if (error.response) {
          throw new Error(`start.gg API error: ${status} ${error.response.statusText}`);
        }
        console.error('Error querying start.gg API:', error);
        throw error;
      }

      // Honour Retry-After when start.gg sends it; otherwise exponential backoff.
      const retryAfter = Number(error.response?.headers?.['retry-after']);
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : RATE_LIMIT_BASE_DELAY_MS * Math.pow(2, attempt);

      console.warn(`start.gg ${status} — retrying in ${delay} ms (attempt ${attempt + 1}/${RATE_LIMIT_MAX_RETRIES}).`);
      lastError = error;
      await sleep(delay);
    }
  }

  throw lastError;
}

// Get tournament by slug.
//
// The slug is normalised first, so a link pasted straight from the browser
// (https://www.start.gg/IFL3-W1) works as well as a bare slug. start.gg resolves
// the short form itself and answers with the canonical one.
async function getTournamentBySlug(slug) {
  return await queryStartGG(queries.tournament.bySlug, { slug: seasons.normalizeSlug(slug) || slug });
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
          // Stop paginating, but record that this event's set list is INCOMPLETE.
          // Returning partial data with no marker made a failed fetch
          // indistinguishable from an event that simply has fewer sets.
          console.log(`    ⚠ Error fetching page ${page}: ${e.message}`);
          event.setsIncomplete = true;
          event.setsError = e.message;
          hasMore = false;
        }
      }
      
      console.log(`    ${event.setsIncomplete ? '⚠' : '✓'} Fetched ${event.sets.nodes.length} matches for ${event.name}${event.setsIncomplete ? ' (INCOMPLETE)' : ''}`);
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

/**
 * Resolves a search term that is really a tournament address.
 *
 * Accepts a full start.gg link or a bare slug in any of its forms; returns the
 * tournament, or null when the term is a name rather than an address or when
 * nothing lives at that slug.
 */
async function resolveTournamentSlug(term) {
  const slug = seasons.normalizeSlug(term);
  // Slugs never contain spaces; anything that does is a name to be searched.
  if (!slug || /\s/.test(slug)) return null;

  try {
    const data = await queryStartGG(queries.tournament.seasonWeek, { slug });
    return data?.tournament ?? null;
  } catch (e) {
    return null;
  }
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

    // A season's own slug -- IFL3, IFL2, iron-fist-league -- asks for the whole
    // season. This is checked before the slug is resolved, because season 2's
    // league slug also resolves to a tournament, and answering a search for
    // "IFL2" with one row instead of twenty-two is not what was asked.
    const season = seasons.seasonFromSlug(term);
    if (season && seasons.weekFromSlug(term) === null) {
      return { tournaments: { nodes: await getSeasonTournaments(season, perPage) } };
    }

    // A pasted link or a slug names one tournament exactly, so resolve it
    // instead of guessing at it by name. This is the only thing that finds a
    // season 3 week, whose short slug (IFL3-W1) shares no words with its own
    // name and whose canonical slug carries an unguessable marketing suffix.
    const direct = await resolveTournamentSlug(term);
    if (direct) return { tournaments: { nodes: [direct] } };

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

// ============================================================
// SEASON DISCOVERY
//
// Listing a season's tournaments used to mean running three fuzzy name searches
// ("Iron Fist League", "IFL", "iron fist") and keeping whatever came back with a
// season 2 slug. start.gg's name filter ranks across the whole site, so the IFL
// does not reliably appear in its own search results at all -- and nothing but
// season 2 could ever be found.
//
// Two sources replace it, both exact:
//
//   * the season's league, one query for the whole season;
//   * a walk over the season's week slugs, for weeks the league has not picked
//     up yet -- which for a season published short-slug-first (IFL3-W1) and with
//     no league object created is, at the start of a season, all of them.
// ============================================================

// How far past the last known week the walk looks before giving up, and the
// ceiling that stops it running away if start.gg starts answering everything.
const WEEK_PROBE_MISS_TOLERANCE = 2;
const WEEK_PROBE_MAX = 40;

/** One start.gg tournament, by any of its week slugs. Null when none resolve. */
async function fetchSeasonWeek(season, week) {
  for (const slug of seasons.weekSlugCandidates(season, week)) {
    try {
      const data = await queryStartGG(queries.tournament.seasonWeek, { slug });
      if (data?.tournament) return data.tournament;
    } catch (e) {
      // A miss is the normal case while walking past the end of a season.
      console.log(`  ✗ Not found: ${slug}`);
    }
  }
  return null;
}

/**
 * Walks a season's weeks from `fromWeek` upward, stopping once enough
 * consecutive weeks fail to resolve.
 */
async function walkSeasonWeeks(season, fromWeek) {
  const found = [];
  let misses = 0;

  for (let week = fromWeek; week <= WEEK_PROBE_MAX && misses <= WEEK_PROBE_MISS_TOLERANCE; week++) {
    const tournament = await fetchSeasonWeek(season, week);
    if (tournament) {
      found.push({ tournament, week });
      misses = 0;
    } else {
      misses++;
    }
  }

  return found;
}

/** The events a season's league lists, or [] when the league does not exist yet. */
async function fetchLeagueEvents(leagueSlug) {
  try {
    const data = await queryStartGG(queries.league.eventsLight, { slug: leagueSlug });
    return data?.league?.events?.nodes ?? [];
  } catch (e) {
    console.error(`Error fetching league "${leagueSlug}":`, e.message);
    return [];
  }
}

/**
 * Every event of a season, as flat rows.
 *
 * The event -- not the tournament -- is the unit of an IFL edition. Season 1 ran
 * editions #4 to #8 inside a single start.gg tournament whose attendee count is
 * the sum of all five, so counting tournaments there would collapse five weeks
 * into one point five times too tall.
 */
function getSeasonEvents(season) {
  return withCache(`season-events:${season}`, TTL.LISTING, () => getSeasonEventsUncached(season));
}

async function getSeasonEventsUncached(season) {
  const entry = seasons.getSeason(season);
  if (!entry) return [];

  const rows = [];
  const seenEvents = new Set();

  const addRow = (row) => {
    const key = row.eventSlug || `${row.slug}#${row.id}`;
    if (seenEvents.has(key)) return;
    seenEvents.add(key);
    rows.push(row);
  };

  for (const event of await fetchLeagueEvents(entry.leagueSlug)) {
    const tournament = event.tournament;
    const tournamentSlug = seasons.normalizeSlug(tournament?.slug || event.slug.split('/event/')[0]);
    addRow({
      id: tournament?.id || event.id,
      eventId: event.id,
      name: tournament?.name || event.name,
      eventName: event.name,
      slug: tournamentSlug,
      eventSlug: event.slug,
      numEntrants: event.numEntrants || 0,
      numAttendees: tournament?.numAttendees || event.numEntrants || 0,
      startAt: tournament?.startAt || event.startAt || 0,
      season,
      weekNumber: seasons.weekNumberOf({
        eventName: event.name,
        eventSlug: event.slug,
        tournamentName: tournament?.name,
        tournamentSlug,
      }),
    });
  }

  // Past seasons are fully described by their league. The current one is walked
  // past whatever the league knows, because a week is published as a tournament
  // days before it is attached to the league -- if it ever is.
  const knownWeeks = rows.map(r => r.weekNumber).filter(Number.isFinite);
  const shouldWalk = rows.length === 0 || season === seasons.CURRENT_SEASON;

  if (shouldWalk) {
    const fromWeek = knownWeeks.length ? Math.max(...knownWeeks) + 1 : 1;
    for (const { tournament, week } of await walkSeasonWeeks(season, fromWeek)) {
      const tournamentSlug = seasons.normalizeSlug(tournament.slug);
      for (const event of tournament.events ?? []) {
        addRow({
          id: tournament.id,
          eventId: event.id,
          name: tournament.name,
          eventName: event.name,
          slug: tournamentSlug,
          eventSlug: event.slug,
          numEntrants: event.numEntrants || 0,
          numAttendees: tournament.numAttendees || event.numEntrants || 0,
          startAt: tournament.startAt || 0,
          season,
          weekNumber: seasons.weekNumberOf({
            eventName: event.name,
            eventSlug: event.slug,
            tournamentName: tournament.name,
            tournamentSlug,
          }) ?? week,
        });
      }
    }
  }

  // Oldest first: the participation chart reads left to right, and every other
  // caller sorts for itself.
  rows.sort((a, b) => (a.weekNumber ?? 0) - (b.weekNumber ?? 0) || (a.startAt || 0) - (b.startAt || 0));

  return rows;
}

/**
 * A season's tournaments, most recent first -- one row per start.gg tournament,
 * which is what the sync and the tournament pickers address.
 */
async function getSeasonTournaments(season, maxResults = 50) {
  const bySlug = new Map();

  for (const row of await getSeasonEvents(season)) {
    const existing = bySlug.get(row.slug);
    if (existing) {
      existing.events.push({ id: row.eventId, name: row.eventName, slug: row.eventSlug });
      continue;
    }
    bySlug.set(row.slug, {
      id: row.id,
      name: row.name,
      slug: row.slug,
      startAt: row.startAt,
      season: row.season,
      weekNumber: row.weekNumber,
      numAttendees: row.numAttendees,
      events: [{ id: row.eventId, name: row.eventName, slug: row.eventSlug }],
    });
  }

  return [...bySlug.values()]
    .sort((a, b) => (b.startAt || 0) - (a.startAt || 0))
    .slice(0, maxResults);
}

// Get an IFL tournament by its week/edition number within a season.
async function getIFLTournamentByNumber(identifier, season = seasons.CURRENT_SEASON) {
  const tournament = await fetchSeasonWeek(season, identifier);
  if (tournament) {
    console.log(`  ✓ Found IFL tournament with slug: ${tournament.slug}`);
    return { tournament };
  }

  console.error(`Tournament not found for season ${season}, week ${identifier}`);
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

/**
 * Get league standings from start.gg (includes rank and points).
 *
 * A season's league object is created some way into the season, so the current
 * season has no standings to serve for a while. Rather than show an empty
 * leaderboard, the lookup falls back to the most recent season that does have
 * one, and reports which season the returned standings are actually from.
 *
 * @returns {Promise<{ season: number|null, standings: object[] }>}
 */
function getLeagueStandings(season = seasons.CURRENT_SEASON, limit = 8) {
  return withCache(`league-standings:${season}:${limit}`, TTL.LIVE, () =>
    getLeagueStandingsUncached(season, limit));
}

async function getLeagueStandingsUncached(season, limit) {
  const candidates = seasons.SEASON_NUMBERS
    .filter(n => n <= Number(season))
    .sort((a, b) => b - a);

  for (const candidate of candidates) {
    const standings = await fetchLeagueStandings(seasons.getSeason(candidate).leagueSlug, limit);
    if (standings.length > 0) return { season: candidate, standings };
    console.log(`No standings for season ${candidate}; falling back to the previous season.`);
  }

  return { season: null, standings: [] };
}

async function fetchLeagueStandings(leagueSlug, limit) {
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

/**
 * Participation stats for one season, oldest week first.
 *
 * `participant_count` is the event's entrant count rather than the tournament's
 * attendee count: they are the same number for seasons 2 and 3, but season 1 ran
 * several editions per tournament, where the attendee count is their sum.
 */
async function getSeasonTournamentStats(season, limit = 50) {
  const events = await getSeasonEvents(season);

  return events.slice(0, limit).map(e => ({
    tournament_id: e.id,
    event_id: e.eventId,
    name: e.name,
    event_name: e.eventName,
    slug: e.slug,
    season: e.season,
    start_date: e.startAt ? new Date(e.startAt * 1000).toISOString() : null,
    status: 'completed',
    participant_count: e.numEntrants || e.numAttendees || 0,
    match_count: 0,
    week_number: e.weekNumber,
  }));
}

/** The same stats for every season, fetched together. */
async function getAllSeasonsTournamentStats(limit = 50) {
  const perSeason = await Promise.all(
    seasons.SEASON_NUMBERS.map(season =>
      getSeasonTournamentStats(season, limit).catch(e => {
        console.error(`Error fetching stats for season ${season}:`, e.message);
        return [];
      })
    )
  );

  return perSeason.flat();
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
  getTournamentBySlug,
  getTournamentEvents,
  getEventSetsByEventId,
  getPlayerInfo,
  getTournamentParticipants,
  getTournamentSeries,
  searchTournaments,
  getSeasonEvents,
  getSeasonTournaments,
  getIFLTournamentByNumber,
  getAllTournamentSets,
  getLeagueStandings,
  getSeasonTournamentStats,
  getAllSeasonsTournamentStats,
  getEventStandings,
  getEventBracket,
  getPlayerLeaguePlacements,
  queryStartGG,
  clearCache
};

