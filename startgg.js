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

// Get tournament events with sets (matches)
async function getTournamentEvents(slug, eventSlug = null) {
  const query = `
    query TournamentEventsQuery($slug: String!, $eventSlug: String) {
      tournament(slug: $slug) {
        id
        name
        slug
        startAt
        endAt
        events(slug: $eventSlug) {
          id
          name
          slug
          videogame {
            id
            name
          }
          sets(
            page: 1
            perPage: 500
            filters: {
              hideEmpty: true
            }
          ) {
            nodes {
              id
              round
              fullRoundText
              displayScore
              winnerId
              completedAt
              slots {
                id
                entrant {
                  id
                  name
                  participants {
                    id
                    gamerTag
                    player {
                      id
                      gamerTag
                      user {
                        id
                        slug
                        player {
                          gamerTag
                        }
                      }
                    }
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

  return await queryStartGG(query, { slug, eventSlug });
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

// Get tournament participants/entrants
async function getTournamentParticipants(slug, eventSlug = null) {
  const query = `
    query TournamentParticipantsQuery($slug: String!, $eventSlug: String) {
      tournament(slug: $slug) {
        id
        name
        events(slug: $eventSlug) {
          id
          name
          entrants(query: {
            page: 1
            perPage: 500
          }) {
            nodes {
              id
              name
              participants {
                id
                gamerTag
                player {
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
                }
              }
            }
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { slug, eventSlug });
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
async function searchTournaments(searchTerm, perPage = 25) {
  const query = `
    query SearchTournaments($term: String!, $perPage: Int!) {
      tournaments(query: {
        filter: {
          name: $term
        }
        page: 1
        perPage: $perPage
      }) {
        nodes {
          id
          name
          slug
          startAt
          endAt
          events {
            id
            name
            slug
          }
        }
      }
    }
  `;

  return await queryStartGG(query, { term: searchTerm, perPage });
}

// Get all sets (matches) for a tournament event
async function getAllTournamentSets(slug, eventSlug = null) {
  let allSets = [];
  let page = 1;
  const perPage = 500;
  let hasMore = true;

  while (hasMore) {
    const query = `
      query TournamentSetsQuery($slug: String!, $eventSlug: String, $page: Int!, $perPage: Int!) {
        tournament(slug: $slug) {
          id
          events(slug: $eventSlug) {
            id
            name
            sets(
              page: $page
              perPage: $perPage
              filters: {
                hideEmpty: true
              }
            ) {
              nodes {
                id
                round
                fullRoundText
                displayScore
                winnerId
                completedAt
                slots {
                  id
                  entrant {
                    id
                    name
                    participants {
                      id
                      gamerTag
                      player {
                        id
                        gamerTag
                        prefix
                        user {
                          id
                          slug
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                totalPages
                total
              }
            }
          }
        }
      }
    `;

    const data = await queryStartGG(query, { slug, eventSlug, page, perPage });
    
    if (data.tournament && data.tournament.events && data.tournament.events.length > 0) {
      const event = data.tournament.events[0];
      if (event.sets && event.sets.nodes) {
        allSets = allSets.concat(event.sets.nodes);
        
        const pageInfo = event.sets.pageInfo;
        hasMore = page < pageInfo.totalPages;
        page++;
      } else {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return allSets;
}

module.exports = {
  getTournamentBySlug,
  getTournamentEvents,
  getPlayerInfo,
  getTournamentParticipants,
  getTournamentSeries,
  searchTournaments,
  getAllTournamentSets,
  queryStartGG
};

