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

// GraphQL query helper
async function queryStartGG(query, variables = {}) {
  if (!STARTGG_API_KEY) {
    throw new Error('STARTGG_API_KEY is not configured');
  }

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

// Get tournament events (without sets - just to get event IDs)
async function getTournamentEvents(slug) {
  const data = await queryStartGG(queries.tournament.events, { slug });
  
  // Now fetch all sets for each event with pagination
  if (data && data.tournament && data.tournament.events) {
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

// Legacy function for compatibility
async function getEventSets(tournamentSlug, eventId, page = 1, perPage = 50) {
  return getEventSetsByEventId(eventId, page, perPage);
}

// Get player information from start.gg
async function getPlayerInfo(playerSlug) {
  return await queryStartGG(queries.player.info, { slug: playerSlug });
}

// Get tournament participants/entrants with full player info
async function getTournamentParticipants(slug) {
  return await queryStartGG(queries.tournament.participants, { slug });
}

// Get upcoming/past tournaments for a tournament series (like "iron-fist-league")
async function getTournamentSeries(slug, upcoming = true, past = true) {
  // Note: start.gg doesn't have a direct "series" endpoint
  // You'll need to search for tournaments with similar slugs
  return await queryStartGG(queries.tournament.series, { slug });
}

// Search for tournaments by name/term
async function searchTournaments(searchTerm, perPage = 50) {
  try {
    const data = await queryStartGG(queries.search.tournaments, { perPage });
    
    if (!data || !data.tournaments || !data.tournaments.nodes) {
      return { tournaments: { nodes: [] } };
    }

    // Filter tournaments that match the search term (case-insensitive)
    // This handles patterns like "iron-fist-league-1", "iron-fist-league-2-finals", etc.
    const searchLower = searchTerm.toLowerCase().replace(/-/g, ' ');
    const filtered = data.tournaments.nodes.filter(t => {
      const nameLower = t.name.toLowerCase();
      const slugLower = t.slug.toLowerCase().replace(/-/g, ' ');
      return nameLower.includes(searchLower) || 
             slugLower.includes(searchLower) ||
             slugLower.includes(searchTerm.toLowerCase());
    });

    return { tournaments: { nodes: filtered } };
  } catch (error) {
    console.error('Error in searchTournaments:', error);
    throw error;
  }
}

// Search for Iron Fist League Season 2 tournaments specifically
// ONLY returns tournaments where slug starts with 'iron-fist-league-2'
async function searchIronFistLeagueTournaments(maxResults = 50) {
  const allTournaments = [];
  const seenIds = new Set();

  // Search with multiple terms to find all potential matches
  const searchTerms = ['Iron Fist League', 'IFL', 'iron fist'];
  
  for (const term of searchTerms) {
    try {
      const data = await queryStartGG(queries.search.tournamentsByName, { term });
      
      if (data && data.tournaments && data.tournaments.nodes) {
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
    } catch (e) {
      console.error(`  Error searching "${term}":`, e.message);
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

// Get all sets (matches) for a tournament with full pagination
async function getAllTournamentSets(slug) {
  // First get the tournament events
  const eventsData = await queryStartGG(queries.tournament.eventsBasic, { slug });
  
  if (!eventsData || !eventsData.tournament || !eventsData.tournament.events) {
    return [];
  }
  
  let allSets = [];
  
  // Fetch all sets for each event
  for (const event of eventsData.tournament.events) {
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
async function getLeagueStandings(leagueSlug = IFL_LEAGUE_SLUG, limit = 8) {
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
async function getEventStandings(eventSlug, limit = 8) {
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
async function getEventBracket(eventSlug, page = 1, perPage = 25) {
  try {
    // Find the Top 8 phase group IDs
    let phaseGroupIds = null;
    const phasesData = await queryStartGG(queries.event.phases, { slug: eventSlug });
    if (phasesData?.event?.phases) {
      const top8Phase = phasesData.event.phases.find(p => /top\s*8/i.test(p.name));
      if (top8Phase?.phaseGroups?.nodes?.length) {
        phaseGroupIds = top8Phase.phaseGroups.nodes.map(pg => pg.id);
      }
    }

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
async function getLeagueTournaments(leagueSlug = IFL_LEAGUE_SLUG, limit = 20) {
  try {
    const data = await queryStartGG(queries.league.events, { slug: leagueSlug });
    
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
  getEventSets,
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
  queryStartGG
};

