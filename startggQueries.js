/**
 * start.gg GraphQL Queries
 * Centralized query definitions for cleaner code organization
 */

const queries = {
  // Tournament queries
  tournament: {
    bySlug: `
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
    `,

    events: `
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
    `,

    eventsBasic: `
      query TournamentEventsQuery($slug: String!) {
        tournament(slug: $slug) {
          id
          events {
            id
            name
          }
        }
      }
    `,

    participants: `
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
    `,

    series: `
      query TournamentSeriesQuery($slug: String!) {
        tournament(slug: $slug) {
          id
          name
          slug
        }
      }
    `,
  },

  // Event queries
  event: {
    sets: `
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
    `,

    bracket: `
      query EventBracket($slug: String!, $page: Int!, $perPage: Int!) {
        event(slug: $slug) {
          id
          name
          state
          numEntrants
          sets(page: $page, perPage: $perPage, sortType: STANDARD, filters: { hideEmpty: true }) {
            pageInfo {
              total
              totalPages
            }
            nodes {
              id
              round
              fullRoundText
              displayScore
              state
              winnerId
              slots {
                entrant {
                  id
                  name
                  participants {
                    user {
                      location {
                        country
                      }
                    }
                  }
                }
                standing {
                  stats {
                    score {
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,

    standings: `
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
    `,
  },

  // League queries
  league: {
    standings: `
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
                    id
                    slug
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
    `,

    standingsWithStats: `
      query LeagueStandingsWithStats($slug: String!, $page: Int!, $perPage: Int!) {
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
                    id
                    slug
                    location {
                      country
                    }
                    player {
                      id
                      gamerTag
                    }
                  }
                }
              }
              totalPoints
            }
            pageInfo {
              total
              totalPages
            }
          }
        }
      }
    `,

    events: `
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
    `,
  },

  // Player queries
  player: {
    info: `
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
    `,
  },

  // Search queries
  search: {
    tournaments: `
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
    `,

    tournamentsByName: `
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
    `,
  },
};

module.exports = queries;
