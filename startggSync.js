const startgg = require('./startgg');
const dbHelpers = require('./dbHelpers');
const pool = require('./db');

// Country name to ISO 2-letter code mapping
const COUNTRY_CODE_MAP = {
  'france': 'fr', 'germany': 'de', 'united kingdom': 'gb', 'uk': 'gb', 'england': 'gb',
  'united states': 'us', 'usa': 'us', 'spain': 'es', 'italy': 'it', 'portugal': 'pt',
  'netherlands': 'nl', 'belgium': 'be', 'switzerland': 'ch', 'austria': 'at',
  'poland': 'pl', 'sweden': 'se', 'norway': 'no', 'denmark': 'dk', 'finland': 'fi',
  'ireland': 'ie', 'canada': 'ca', 'australia': 'au', 'japan': 'jp', 'south korea': 'kr',
  'korea': 'kr', 'china': 'cn', 'brazil': 'br', 'mexico': 'mx', 'argentina': 'ar',
  'russia': 'ru', 'ukraine': 'ua', 'turkey': 'tr', 'greece': 'gr', 'czech republic': 'cz',
  'czechia': 'cz', 'hungary': 'hu', 'romania': 'ro', 'bulgaria': 'bg', 'croatia': 'hr',
  'serbia': 'rs', 'morocco': 'ma', 'algeria': 'dz', 'tunisia': 'tn', 'egypt': 'eg',
  'south africa': 'za', 'india': 'in', 'pakistan': 'pk', 'philippines': 'ph',
  'indonesia': 'id', 'malaysia': 'my', 'singapore': 'sg', 'thailand': 'th', 'vietnam': 'vn',
  'taiwan': 'tw', 'hong kong': 'hk', 'new zealand': 'nz', 'chile': 'cl', 'colombia': 'co',
  'peru': 'pe', 'venezuela': 've', 'saudi arabia': 'sa', 'uae': 'ae', 'united arab emirates': 'ae',
  'israel': 'il', 'luxembourg': 'lu', 'iceland': 'is', 'estonia': 'ee', 'latvia': 'lv',
  'lithuania': 'lt', 'slovakia': 'sk', 'slovenia': 'si', 'reunion': 're', 'réunion': 're',
  'martinique': 'mq', 'guadeloupe': 'gp', 'french guiana': 'gf', 'mayotte': 'yt'
};

// Convert country name to 2-letter code
function getCountryCode(countryName) {
  if (!countryName) return null;
  
  // If already a 2-letter code, return it
  if (countryName.length === 2) return countryName.toLowerCase();
  
  // Look up in map
  const normalized = countryName.toLowerCase().trim();
  return COUNTRY_CODE_MAP[normalized] || null;
}

// Map start.gg data to our database schema

// Sync a tournament from start.gg to our database
async function syncTournamentFromStartGG(slug, eventSlug = null) {
  try {
    console.log(`\n========================================`);
    console.log(`Syncing tournament: ${slug}`);
    console.log(`========================================`);
    
    // Test database connection first
    console.log('  Testing database connection...');
    try {
      const connection = await pool.getConnection();
      connection.release();
      console.log('  ✓ Database connected');
    } catch (dbError) {
      console.error('  ✗ Database connection failed:', dbError.message);
      throw new Error(`Database not connected: ${dbError.message}`);
    }
    
    // Get tournament data
    console.log('  Fetching tournament data from start.gg...');
    const tournamentData = await startgg.getTournamentBySlug(slug);
    
    if (!tournamentData || !tournamentData.tournament) {
      console.log('  ✗ Tournament not found on start.gg');
      throw new Error(`Tournament not found: ${slug}`);
    }

    const tournament = tournamentData.tournament;
    console.log(`  ✓ Found: ${tournament.name}`);
    
    // Find or create tournament in database
    let [tournamentRows] = await pool.execute(
      'SELECT tournament_id FROM tournaments WHERE name = ? ORDER BY tournament_id DESC LIMIT 1',
      [tournament.name]
    );

    let tournamentId;
    if (tournamentRows.length === 0) {
      // Create new tournament
      const startDate = tournament.startAt ? new Date(tournament.startAt * 1000) : null;
      const endDate = tournament.endAt ? new Date(tournament.endAt * 1000) : startDate;
      
      // Determine status based on dates
      const now = new Date();
      let status = 'registration';
      if (endDate && now > endDate) {
        status = 'completed';
      } else if (startDate && now >= startDate) {
        status = 'active';
      }
      
      const [result] = await pool.execute(
        'INSERT INTO tournaments (name, season, start_date, status, game_version) VALUES (?, ?, ?, ?, ?)',
        [tournament.name, 'Season 1', startDate, status, 'Tekken 8']
      );
      tournamentId = result.insertId;
      console.log(`  Created tournament with status: ${status}`);
    } else {
      tournamentId = tournamentRows[0].tournament_id;
      
      // Update status if tournament exists
      const startDate = tournament.startAt ? new Date(tournament.startAt * 1000) : null;
      const endDate = tournament.endAt ? new Date(tournament.endAt * 1000) : startDate;
      const now = new Date();
      let status = 'registration';
      if (endDate && now > endDate) {
        status = 'completed';
      } else if (startDate && now >= startDate) {
        status = 'active';
      }
      
      await pool.execute(
        'UPDATE tournaments SET status = ? WHERE tournament_id = ?',
        [status, tournamentId]
      );
    }

    // Get events data
    console.log('  Fetching events and matches...');
    const eventsData = await startgg.getTournamentEvents(slug);
    
    if (!eventsData || !eventsData.tournament || !eventsData.tournament.events) {
      console.log('  ✗ No events found for tournament');
      console.log('  Response:', JSON.stringify(eventsData, null, 2).substring(0, 500));
      return { tournamentId, playersSynced: 0, matchesSynced: 0 };
    }

    const events = eventsData.tournament.events;
    console.log(`  ✓ Found ${events.length} event(s)`);
    
    let playersSynced = 0;
    let playersUpdated = 0;
    let matchesSynced = 0;
    let matchesUpdated = 0;

    // Process each event
    for (const event of events) {
      console.log(`  Processing event: ${event.name}`);
      
      if (!event.sets || !event.sets.nodes) {
        console.log(`    ✗ No sets/matches in this event`);
        continue;
      }
      
      const totalSets = event.sets.pageInfo?.total || event.sets.nodes.length;
      console.log(`    Found ${event.sets.nodes.length} matches (${totalSets} total)`);

      // Sync players from entrants with sponsor and country info
      try {
        const participantsData = await startgg.getTournamentParticipants(slug);
        
        if (participantsData && participantsData.tournament && participantsData.tournament.events) {
          for (const evt of participantsData.tournament.events) {
            if (evt.entrants && evt.entrants.nodes) {
              for (const entrant of evt.entrants.nodes) {
                if (entrant.participants && entrant.participants.length > 0) {
                  for (const participant of entrant.participants) {
                    const gamerTag = participant.gamerTag || (participant.player && participant.player.gamerTag);
                    if (!gamerTag) continue;
                    
                    // Get sponsor prefix from participant or player
                    const sponsor = participant.prefix || (participant.player && participant.player.prefix) || null;
                    
                    // Get country from user location (try participant.user first, then player.user)
                    let countryName = null;
                    if (participant.user && participant.user.location && participant.user.location.country) {
                      countryName = participant.user.location.country;
                    } else if (participant.player && participant.player.user && participant.player.user.location && participant.player.user.location.country) {
                      countryName = participant.player.user.location.country;
                    }
                    
                    // Convert country name to 2-letter code for flag display
                    const countryCode = getCountryCode(countryName);
                    
                    // Get or create user - search by multiple possible formats to avoid duplicates
                    // Check for: exact username, or old format "SPONSOR | username", or username ending with the gamerTag
                    const oldFormatName = sponsor ? `${sponsor} | ${gamerTag}` : null;
                    
                    let [userRows] = await pool.execute(
                      `SELECT user_id, username, sponsor, country FROM users 
                       WHERE username = ? 
                       OR username = ?
                       OR username LIKE ?`,
                      [gamerTag, oldFormatName || gamerTag, `% | ${gamerTag}`]
                    );

                    if (userRows.length === 0) {
                      // Create new user with all available info
                      await pool.execute(
                        'INSERT INTO users (username, sponsor, country, main_character) VALUES (?, ?, ?, ?)',
                        [gamerTag, sponsor, countryCode, null]
                      );
                      playersSynced++;
                    } else {
                      // Found existing user - update with latest data and fix username if it's in old format
                      const existingUser = userRows[0];
                      const needsUsernameFixed = existingUser.username.includes(' | ');
                      const newSponsor = sponsor || existingUser.sponsor;
                      const newCountry = countryCode || existingUser.country;
                      
                      // Check if anything needs updating
                      const usernameNeedsFix = needsUsernameFixed;
                      const sponsorChanged = sponsor && sponsor !== existingUser.sponsor;
                      const countryChanged = countryCode && countryCode !== existingUser.country;
                      
                      if (usernameNeedsFix || sponsorChanged || countryChanged) {
                        await pool.execute(
                          'UPDATE users SET username = ?, sponsor = ?, country = ? WHERE user_id = ?',
                          [gamerTag, newSponsor, newCountry, existingUser.user_id]
                        );
                        playersUpdated++;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (participantError) {
        console.log(`    ⚠ Could not sync participants: ${participantError.message}`);
        // Continue with matches anyway
      }

      // Sync matches (sets) - use entrant names directly
      let processedSets = 0;
      let skippedNoSlots = 0;
      let skippedNoEntrant = 0;
      let skippedNoName = 0;
      let matchesUpdatedInEvent = 0;
      
      for (const set of event.sets.nodes) {
        if (!set.slots || set.slots.length < 2) {
          skippedNoSlots++;
          continue;
        }

        const slot1 = set.slots[0];
        const slot2 = set.slots[1];

        if (!slot1.entrant || !slot2.entrant) {
          skippedNoEntrant++;
          continue;
        }

        // Get player names from entrant.name
        const p1Name = slot1.entrant.name;
        const p2Name = slot2.entrant.name;

        if (!p1Name || !p2Name) {
          skippedNoName++;
          continue;
        }
        
        processedSets++;

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

        // Parse scores from displayScore
        // Format: "PlayerName 2 - PlayerName 3" or "DQ" or similar
        let scoreP1 = 0;
        let scoreP2 = 0;
        let isDQ = false;
        
        if (set.displayScore) {
          if (set.displayScore === 'DQ' || set.displayScore.includes('DQ')) {
            isDQ = true;
          } else {
            // Try to extract scores - format is usually "Name 2 - Name 3"
            const parts = set.displayScore.split(' - ');
            if (parts.length === 2) {
              // Extract last number from each part (the score is at the end)
              const p1Match = parts[0].match(/(\d+)$/);
              const p2Match = parts[1].match(/(\d+)$/);
              if (p1Match) scoreP1 = parseInt(p1Match[1]) || 0;
              if (p2Match) scoreP2 = parseInt(p2Match[1]) || 0;
            }
          }
        }

        // Determine winner - use start.gg winnerId first
        let winnerId = null;
        if (set.winnerId) {
          // Convert to number for comparison since IDs might be strings or numbers
          const winnerIdNum = parseInt(set.winnerId);
          const slot1IdNum = parseInt(slot1.entrant.id);
          const slot2IdNum = parseInt(slot2.entrant.id);
          
          if (winnerIdNum === slot1IdNum) {
            winnerId = p1Id;
          } else if (winnerIdNum === slot2IdNum) {
            winnerId = p2Id;
          }
        }
        
        // Fallback: determine winner from scores if winnerId didn't match
        if (!winnerId && !isDQ && (scoreP1 > 0 || scoreP2 > 0)) {
          if (scoreP1 > scoreP2) {
            winnerId = p1Id;
          } else if (scoreP2 > scoreP1) {
            winnerId = p2Id;
          }
        }


        // Check if match already exists
        const matchTime = set.completedAt ? new Date(set.completedAt * 1000) : new Date();
        const roundName = set.fullRoundText || set.round || 'Unknown Round';

        const [existingMatches] = await pool.execute(
          'SELECT match_id, score_p1, score_p2, winner_id FROM matches WHERE tournament_id = ? AND player1_id = ? AND player2_id = ? AND round_name = ?',
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
        } else {
          // Match exists - update if we have better data (actual scores instead of 0-0)
          const existingMatch = existingMatches[0];
          const existingHasScores = (existingMatch.score_p1 > 0 || existingMatch.score_p2 > 0);
          const newHasScores = (scoreP1 > 0 || scoreP2 > 0);
          const existingHasWinner = existingMatch.winner_id !== null;
          const newHasWinner = winnerId !== null;
          
          // Update if: new data has scores and existing doesn't, OR new data has winner and existing doesn't
          if ((newHasScores && !existingHasScores) || (newHasWinner && !existingHasWinner)) {
            await pool.execute(
              `UPDATE matches SET score_p1 = ?, score_p2 = ?, winner_id = ?, match_time = ? WHERE match_id = ?`,
              [
                newHasScores ? scoreP1 : existingMatch.score_p1,
                newHasScores ? scoreP2 : existingMatch.score_p2,
                newHasWinner ? winnerId : existingMatch.winner_id,
                matchTime,
                existingMatch.match_id
              ]
            );
            matchesUpdated++;
            matchesUpdatedInEvent++;
          }
        }
      }
      
      // Debug logging
      console.log(`    Processed: ${processedSets}, Skipped: noSlots=${skippedNoSlots}, noEntrant=${skippedNoEntrant}, noName=${skippedNoName}, Updated: ${matchesUpdatedInEvent}`);
      
      // Log first set for debugging if nothing was processed
    }

    console.log(`  ✓ Sync complete: ${playersSynced} players added, ${playersUpdated} players updated, ${matchesSynced} matches added, ${matchesUpdated} matches updated`);
    console.log(`========================================\n`);
    return { tournamentId, playersSynced, playersUpdated, matchesSynced, matchesUpdated };
  } catch (error) {
    console.error('✗ Error syncing tournament from start.gg:', error.message);
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

