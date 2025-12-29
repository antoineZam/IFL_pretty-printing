const axios = require('axios');

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
  const query = `
    query TournamentQuery($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
        startAt
        endAt
        events {
          id
          name
          slug
          videogame {
            id
            name
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { slug });
}

// Get tournament events (without sets - just to get event IDs)
async function getTournamentEvents(slug) {
  const query = `
    query TournamentEventsQuery($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
        startAt
        endAt
        events {
          id
          name
          slug
          numEntrants
        }
      }
    }
  `;

  const data = await queryStartGG(query, { slug });
  
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
// Simplified query to stay under complexity limits
async function getEventSetsByEventId(eventId, page = 1, perPage = 20) {
  const query = `
    query EventSetsQuery($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        id
        name
        sets(page: $page, perPage: $perPage, sortType: RECENT) {
          pageInfo {
            total
            totalPages
          }
          nodes {
            id
            fullRoundText
            displayScore
            winnerId
            completedAt
            slots {
              entrant {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { eventId, page, perPage });
}

// Legacy function for compatibility
async function getEventSets(tournamentSlug, eventId, page = 1, perPage = 50) {
  return getEventSetsByEventId(eventId, page, perPage);
}

// Get player information from start.gg
async function getPlayerInfo(playerSlug) {
  const query = `
    query PlayerQuery($slug: String!) {
      player(slug: $slug) {
        id
        gamerTag
        prefix
        user {
          id
          slug
          player {
            gamerTag
          }
        }
        recentStandings {
          id
          placement
          event {
            id
            name
            slug
            tournament {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { slug: playerSlug });
}

// Get tournament participants/entrants with full player info
async function getTournamentParticipants(slug) {
  const query = `
    query TournamentParticipantsQuery($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        events {
          id
          name
          entrants(query: {
            page: 1
            perPage: 100
          }) {
            nodes {
              id
              name
              participants {
                id
                gamerTag
                prefix
                user {
                  id
                  location {
                    country
                    countryId
                  }
                }
                player {
                  id
                  gamerTag
                  prefix
                  user {
                    id
                    location {
                      country
                      countryId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { slug });
}

// Get upcoming/past tournaments for a tournament series (like "iron-fist-league")
async function getTournamentSeries(slug, upcoming = true, past = true) {
  const query = `
    query TournamentSeriesQuery($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
      }
    }
  `;

  // Note: start.gg doesn't have a direct "series" endpoint
  // You'll need to search for tournaments with similar slugs
  // For now, we'll get the specific tournament
  return await queryStartGG(query, { slug });
}

// Search for tournaments by name/term
async function searchTournaments(searchTerm, perPage = 50) {
  const query = `
    query SearchTournaments($perPage: Int!) {
      tournaments(query: {
        page: 1
        perPage: $perPage
        sortBy: "startAt desc"
      }) {
        nodes {
          id
          name
          slug
          startAt
          endAt
          numAttendees
          events {
            id
            name
            slug
            numEntrants
          }
        }
      }
    }
  `;

  try {
    const data = await queryStartGG(query, { perPage });
    
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
  // Use simpler query to avoid complexity limits
  const searchTerms = ['Iron Fist League', 'IFL', 'iron fist'];
  
  for (const term of searchTerms) {
    try {
      // Simplified query - no nested events to reduce complexity
      const searchQuery = `
        query SearchTerm($term: String!) {
          tournaments(query: {
            page: 1
            perPage: 50
            filter: {
              name: $term
            }
          }) {
            nodes {
              id
              name
              slug
              startAt
              endAt
              numAttendees
            }
          }
        }
      `;
      
      const data = await queryStartGG(searchQuery, { term });
      
      if (data && data.tournaments && data.tournaments.nodes) {
        for (const t of data.tournaments.nodes) {
          // STRICT FILTER: slug MUST contain 'iron-fist-league'
          const slugMatch = t.slug && t.slug.toLowerCase().includes('iron-fist-league');
          
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
// - iron-fist-league-1
// - iron-fist-league-2-finals  
// - iron-fist-league-10-grand-finals
async function getIFLTournamentByNumber(tournamentNumber, suffix = '') {
  let slug = `iron-fist-league-${tournamentNumber}`;
  if (suffix) {
    slug += `-${suffix}`;
  }
  
  try {
    return await getTournamentBySlug(slug);
  } catch (error) {
    console.error(`Tournament not found: ${slug}`);
    return null;
  }
}

// Get all sets (matches) for a tournament with full pagination
async function getAllTournamentSets(slug) {
  // First get the tournament events
  const eventsQuery = `
    query TournamentEventsQuery($slug: String!) {
      tournament(slug: $slug) {
        id
        events {
          id
          name
        }
      }
    }
  `;
  
  const eventsData = await queryStartGG(eventsQuery, { slug });
  
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

// Get league standings from start.gg
async function getLeagueStandings(leagueSlug = 'iron-fist-league', limit = 8) {
  const query = `
    query LeagueStandings($slug: String!, $page: Int!, $perPage: Int!) {
      league(slug: $slug) {
        id
        name
        standings(query: { page: $page, perPage: $perPage }) {
          nodes {
            id
            placement
            entrant {
              id
              name
              participants {
                gamerTag
                prefix
                user {
                  location {
                    country
                  }
                }
              }
            }
            totalPoints
          }
        }
      }
    }
  `;

  try {
    const data = await queryStartGG(query, { 
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
  const query = `
    query EventStandings($slug: String!, $page: Int!, $perPage: Int!) {
      event(slug: $slug) {
        id
        name
        standings(query: { page: $page, perPage: $perPage }) {
          nodes {
            placement
            entrant {
              id
              name
              participants {
                gamerTag
                prefix
                user {
                  location {
                    country
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await queryStartGG(query, { 
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

// Get player's placements across tournaments in a league
async function getPlayerLeaguePlacements(leagueSlug, playerName, limit = 20) {
  // First get all events in the league
  const query = `
    query LeagueEvents($slug: String!) {
      league(slug: $slug) {
        id
        name
        events(query: { page: 1, perPage: 50 }) {
          nodes {
            id
            name
            slug
            tournament {
              name
            }
            standings(query: { page: 1, perPage: 64 }) {
              nodes {
                placement
                entrant {
                  name
                  participants {
                    gamerTag
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await queryStartGG(query, { slug: leagueSlug });
    
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
  getPlayerLeaguePlacements,
  queryStartGG
};

