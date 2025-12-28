const startgg = require('./startgg');
const dbHelpers = require('./dbHelpers');
const pool = require('./db');

// Map start.gg data to our database schema

// Sync a tournament from start.gg to our database
async function syncTournamentFromStartGG(slug, eventSlug = null) {
  try {
    console.log(`Syncing tournament: ${slug}${eventSlug ? ` (event: ${eventSlug})` : ''}`);
    
    // Get tournament data
    const tournamentData = await startgg.getTournamentBySlug(slug);
    
    if (!tournamentData || !tournamentData.tournament) {
      throw new Error(`Tournament not found: ${slug}`);
    }

    const tournament = tournamentData.tournament;
    
    // Find or create tournament in database
    let [tournamentRows] = await pool.execute(
      'SELECT tournament_id FROM tournaments WHERE name = ? ORDER BY tournament_id DESC LIMIT 1',
      [tournament.name]
    );

    let tournamentId;
    if (tournamentRows.length === 0) {
      // Create new tournament
      const startDate = tournament.startAt ? new Date(tournament.startAt * 1000) : null;
      const [result] = await pool.execute(
        'INSERT INTO tournaments (name, season, start_date, status, game_version) VALUES (?, ?, ?, ?, ?)',
        [tournament.name, 'Season 1', startDate, 'completed', 'Tekken 8']
      );
      tournamentId = result.insertId;
    } else {
      tournamentId = tournamentRows[0].tournament_id;
    }

    // Get events data
    const eventsData = await startgg.getTournamentEvents(slug, eventSlug);
    
    if (!eventsData || !eventsData.tournament || !eventsData.tournament.events) {
      console.warn('No events found for tournament');
      return { tournamentId, playersSynced: 0, matchesSynced: 0 };
    }

    const events = eventsData.tournament.events;
    let playersSynced = 0;
    let matchesSynced = 0;

    // Process each event
    for (const event of events) {
      if (!event.sets || !event.sets.nodes) continue;

      // Sync players from entrants
      const participantsData = await startgg.getTournamentParticipants(slug, event.slug);
      
      if (participantsData && participantsData.tournament && participantsData.tournament.events) {
        for (const evt of participantsData.tournament.events) {
          if (evt.entrants && evt.entrants.nodes) {
            for (const entrant of evt.entrants.nodes) {
              if (entrant.participants && entrant.participants.length > 0) {
                for (const participant of entrant.participants) {
                  const player = participant.player;
                  if (player && player.gamerTag) {
                    const username = player.gamerTag;
                    const country = null; // start.gg doesn't always provide country
                    
                    // Get or create user
                    let [userRows] = await pool.execute(
                      'SELECT user_id FROM users WHERE username = ?',
                      [username]
                    );

                    if (userRows.length === 0) {
                      await pool.execute(
                        'INSERT INTO users (username, country, main_character) VALUES (?, ?, ?)',
                        [username, country, null]
                      );
                      playersSynced++;
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Sync matches (sets)
      for (const set of event.sets.nodes) {
        if (!set.slots || set.slots.length < 2) continue;

        const slot1 = set.slots[0];
        const slot2 = set.slots[1];

        if (!slot1.entrant || !slot2.entrant) continue;

        // Get player names
        const p1Name = slot1.entrant.participants && slot1.entrant.participants.length > 0
          ? slot1.entrant.participants[0].gamerTag || slot1.entrant.participants[0].player?.gamerTag
          : slot1.entrant.name;
        
        const p2Name = slot2.entrant.participants && slot2.entrant.participants.length > 0
          ? slot2.entrant.participants[0].gamerTag || slot2.entrant.participants[0].player?.gamerTag
          : slot2.entrant.name;

        if (!p1Name || !p2Name) continue;

        // Get or create players
        let [p1Rows] = await pool.execute('SELECT user_id FROM users WHERE username = ?', [p1Name]);
        let p1Id;
        if (p1Rows.length === 0) {
          const [p1Result] = await pool.execute(
            'INSERT INTO users (username) VALUES (?)',
            [p1Name]
          );
          p1Id = p1Result.insertId;
        } else {
          p1Id = p1Rows[0].user_id;
        }

        let [p2Rows] = await pool.execute('SELECT user_id FROM users WHERE username = ?', [p2Name]);
        let p2Id;
        if (p2Rows.length === 0) {
          const [p2Result] = await pool.execute(
            'INSERT INTO users (username) VALUES (?)',
            [p2Name]
          );
          p2Id = p2Result.insertId;
        } else {
          p2Id = p2Rows[0].user_id;
        }

        // Parse scores from displayScore (format: "2-3" or similar)
        let scoreP1 = 0;
        let scoreP2 = 0;
        if (set.displayScore) {
          const scores = set.displayScore.split('-').map(s => parseInt(s.trim()) || 0);
          if (scores.length >= 2) {
            scoreP1 = scores[0];
            scoreP2 = scores[1];
          }
        }

        // Determine winner
        let winnerId = null;
        if (set.winnerId) {
          if (set.winnerId === slot1.entrant.id) {
            winnerId = p1Id;
          } else if (set.winnerId === slot2.entrant.id) {
            winnerId = p2Id;
          }
        }

        // Check if match already exists
        const matchTime = set.completedAt ? new Date(set.completedAt * 1000) : new Date();
        const roundName = set.fullRoundText || set.round || 'Unknown Round';

        const [existingMatches] = await pool.execute(
          'SELECT match_id FROM matches WHERE tournament_id = ? AND player1_id = ? AND player2_id = ? AND round_name = ?',
          [tournamentId, p1Id, p2Id, roundName]
        );

        if (existingMatches.length === 0) {
          // Insert new match
          await pool.execute(
            `INSERT INTO matches (tournament_id, player1_id, player2_id, winner_id, round_name, score_p1, score_p2, match_time)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [tournamentId, p1Id, p2Id, winnerId, roundName, scoreP1, scoreP2, matchTime]
          );
          matchesSynced++;
        }
      }
    }

    console.log(`Sync complete: ${playersSynced} players, ${matchesSynced} matches`);
    return { tournamentId, playersSynced, matchesSynced };
  } catch (error) {
    console.error('Error syncing tournament from start.gg:', error);
    throw error;
  }
}

// Sync player information from start.gg
async function syncPlayerFromStartGG(playerSlug) {
  try {
    const playerData = await startgg.getPlayerInfo(playerSlug);
    
    if (!playerData || !playerData.player) {
      throw new Error(`Player not found: ${playerSlug}`);
    }

    const player = playerData.player;
    const gamerTag = player.gamerTag || playerSlug;

    // Find or create user
    let [userRows] = await pool.execute(
      'SELECT user_id FROM users WHERE username = ?',
      [gamerTag]
    );

    let userId;
    if (userRows.length === 0) {
      const [result] = await pool.execute(
        'INSERT INTO users (username, main_character) VALUES (?, ?)',
        [gamerTag, null]
      );
      userId = result.insertId;
    } else {
      userId = userRows[0].user_id;
    }

    // Update with additional info if available
    if (player.prefix) {
      await pool.execute(
        'UPDATE users SET username = ? WHERE user_id = ?',
        [`${player.prefix} ${gamerTag}`, userId]
      );
    }

    return userId;
  } catch (error) {
    console.error('Error syncing player from start.gg:', error);
    throw error;
  }
}

// Search for tournaments matching a term (e.g., "iron-fist-league")
async function findTournamentsByTerm(searchTerm) {
  try {
    const data = await startgg.searchTournaments(searchTerm, 50);
    
    if (!data || !data.tournaments || !data.tournaments.nodes) {
      return [];
    }

    return data.tournaments.nodes.map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      startAt: t.startAt ? new Date(t.startAt * 1000) : null,
      endAt: t.endAt ? new Date(t.endAt * 1000) : null,
      events: t.events || []
    }));
  } catch (error) {
    console.error('Error searching tournaments:', error);
    throw error;
  }
}

module.exports = {
  syncTournamentFromStartGG,
  syncPlayerFromStartGG,
  findTournamentsByTerm
};

