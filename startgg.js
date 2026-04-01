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

// Search for Iron Fist League tournaments specifically
// ONLY returns tournaments where slug contains 'iron-fist-league'
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
          // STRICT FILTER: slug MUST contain 'iron-fist-league' OR 'ifl'
          // This handles both full-name slugs (iron-fist-league-1) and abbreviated slugs (ifl-season-2)
          const slugLower = t.slug ? t.slug.toLowerCase() : '';
          const slugMatch = slugLower.includes('iron-fist-league') || 
                           slugLower.match(/\bifl\b/) ||  // Match 'ifl' as whole word
                           slugLower.startsWith('ifl-') || 
                           slugLower.includes('-ifl-') ||
                           slugLower.endsWith('-ifl');
          
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

// Get tournament by slug - handles various formats like:
// - iron-fist-league-1, ifl-1
// - iron-fist-league-2-finals, ifl-2-finals  
// - iron-fist-league-10-grand-finals, ifl-10-grand-finals
async function getIFLTournamentByNumber(tournamentNumber, suffix = '') {
  // Try multiple slug patterns: full name first, then abbreviated
  const slugPatterns = [
    `iron-fist-league-${tournamentNumber}${suffix ? `-${suffix}` : ''}`,
    `ifl-${tournamentNumber}${suffix ? `-${suffix}` : ''}`
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
  
  console.error(`Tournament not found with any pattern for number: ${tournamentNumber}`);
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

// Get league standings from start.gg (includes rank and points)
async function getLeagueStandings(leagueSlug = 'iron-fist-league', limit = 8) {
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

// Get event bracket data (matches/sets) from start.gg
async function getEventBracket(eventSlug, page = 1, perPage = 25) {
  try {
    const data = await queryStartGG(queries.event.bracket, { 
      slug: eventSlug, 
      page, 
      perPage 
    });
    
    if (!data || !data.event) {
      return null;
    }

    const event = data.event;
    
    // Parse entrant info helper - includes score from standing.stats
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
      const score = slot.standing?.stats?.score?.value ?? null;
      
      return {
        id: slot.entrant.id,
        name: username || 'Unknown',
        sponsor: sponsor,
        score: score
      };
    };

    // Fallback: Parse scores from displayScore if API scores are null
    const parseScoresFromDisplay = (displayScore, player1, player2) => {
      if (!displayScore || displayScore === 'DQ' || !player1 || !player2) return;
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

    // Parse sets into a cleaner format
    const sets = (event.sets?.nodes || []).map((set, idx) => {
      // Debug: log first few sets to see raw data
      if (idx < 3) {
        console.log(`[DEBUG Set ${idx}] displayScore: "${set.displayScore}", slot0 standing:`, JSON.stringify(set.slots?.[0]?.standing));
      }
      
      const player1 = parseEntrant(set.slots?.[0]);
      const player2 = parseEntrant(set.slots?.[1]);
      
      // Fallback: parse scores from displayScore if API didn't provide them
      parseScoresFromDisplay(set.displayScore, player1, player2);
      
      // Debug: log parsed scores for first few sets
      if (idx < 3) {
        console.log(`[DEBUG Set ${idx}] After parsing - p1: ${player1?.name} score: ${player1?.score}, p2: ${player2?.name} score: ${player2?.score}`);
      }
      
      return {
        id: set.id,
        round: set.round,
        roundText: set.fullRoundText,
        displayScore: set.displayScore,
        state: set.state, // 1=not started, 2=in progress, 3=completed
        winnerId: set.winnerId,
        player1,
        player2
      };
    });

    return {
      id: event.id,
      name: event.name,
      state: event.state, // CREATED, ACTIVE, COMPLETED
      numEntrants: event.numEntrants,
      sets,
      pageInfo: event.sets?.pageInfo || { total: 0, totalPages: 0 }
    };
  } catch (error) {
    console.error('Error fetching event bracket:', error.message);
    return null;
  }
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
  getEventStandings,
  getEventBracket,
  getPlayerLeaguePlacements,
  queryStartGG
};

