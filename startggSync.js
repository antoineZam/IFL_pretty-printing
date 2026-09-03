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
    
    // Find or create tournament in database.
    //
    // Keyed on the start.gg slug, which is unique and stable. Looking up by
    // `name` alone merged two genuinely distinct start.gg tournaments that
    // happened to share a display name. The name lookup is kept as a fallback so
    // rows created before startgg_slug existed are adopted rather than
    // duplicated -- and backfilled below.
    const cleanSlug = String(slug).replace(/^tournament\//, '');
    let [tournamentRows] = await pool.execute(
      `SELECT tournament_id FROM tournaments
       WHERE startgg_slug = ?
          OR (startgg_slug IS NULL AND name = ?)
       ORDER BY (startgg_slug = ?) DESC, tournament_id DESC
       LIMIT 1`,
      [cleanSlug, tournament.name, cleanSlug]
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
        'INSERT INTO tournaments (name, startgg_slug, season, start_date, status, game_version) VALUES (?, ?, ?, ?, ?, ?)',
        [tournament.name, cleanSlug, 'Season 1', startDate, status, 'Tekken 8']
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
      
      // Backfill startgg_slug on rows that predate the column, so the next sync
      // matches on the slug rather than on the name.
      await pool.execute(
        'UPDATE tournaments SET status = ?, startgg_slug = ? WHERE tournament_id = ?',
        [status, cleanSlug, tournamentId]
      );
    }

    // Get events data.
    //
    // eventSlug is now actually forwarded. It used to appear exactly once in this
    // whole file -- as the parameter declaration itself -- so req.body.eventSlug
    // was silently dropped and a request to sync one event always synced the
    // entire tournament.
    console.log(`  Fetching events and matches${eventSlug ? ` (event: ${eventSlug})` : ''}...`);
    const eventsData = await startgg.getTournamentEvents(slug, { eventSlug, includeSets: true });

    if (!eventsData || !eventsData.tournament || !eventsData.tournament.events) {
      console.log('  ✗ No events found for tournament');
      console.log('  Response:', JSON.stringify(eventsData, null, 2).substring(0, 500));
      return {
        tournamentId, playersSynced: 0, matchesSynced: 0,
        complete: false,
        warnings: ['No events found for this tournament — nothing was synced.'],
      };
    }

    const events = eventsData.tournament.events;
    if (events.length === 0 && eventSlug) {
      throw new Error(`No event matching "${eventSlug}" in tournament "${slug}".`);
    }
    console.log(`  ✓ Found ${events.length} event(s)`);
    
    let playersSynced = 0;
    let playersUpdated = 0;
    let matchesSynced = 0;
    let matchesUpdated = 0;
    // Non-fatal problems that still leave the sync incomplete. Reported back so
    // the caller can tell a partial sync from a clean one -- previously every
    // one of these was swallowed and the response was an unqualified success.
    const warnings = [];

    // Fetch and sync participant data once for the whole tournament
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
                  
                  const sponsor = participant.prefix || (participant.player && participant.player.prefix) || null;
                  
                  let countryName = null;
                  if (participant.user && participant.user.location && participant.user.location.country) {
                    countryName = participant.user.location.country;
                  } else if (participant.player && participant.player.user && participant.player.user.location && participant.player.user.location.country) {
                    countryName = participant.player.user.location.country;
                  }
                  
                  const countryCode = getCountryCode(countryName);
                  const oldFormatName = sponsor ? `${sponsor} | ${gamerTag}` : null;
                  
                  let [userRows] = await pool.execute(
                    `SELECT user_id, username, sponsor, country FROM users 
                     WHERE username = ? 
                     OR username = ?
                     OR username LIKE ?`,
                    [gamerTag, oldFormatName || gamerTag, `% | ${gamerTag}`]
                  );

                  if (userRows.length === 0) {
                    await pool.execute(
                      'INSERT INTO users (username, sponsor, country, main_character) VALUES (?, ?, ?, ?)',
                      [gamerTag, sponsor, countryCode, null]
                    );
                    playersSynced++;
                  } else {
                    const existingUser = userRows[0];
                    const needsUsernameFixed = existingUser.username.includes(' | ');
                    const newSponsor = sponsor || existingUser.sponsor;
                    const newCountry = countryCode || existingUser.country;
                    
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
      // Recorded, not swallowed: a failure here means sponsors and country flags
      // are missing for this tournament, which is invisible until an overlay
      // renders a blank flag mid-broadcast.
      console.log(`  ⚠ Could not sync participants: ${participantError.message}`);
      warnings.push(`Participant sync failed: ${participantError.message}`);
    }

    // Process each event
    for (const event of events) {
      console.log(`  Processing event: ${event.name}`);

      // Part of the per-set dedupe key -- see the lookup below.
      const eventName = event.name || null;

      if (event.setsIncomplete) {
        warnings.push(`Event "${event.name}": set list is incomplete (${event.setsError}). Some matches were not synced.`);
      }
      
      if (!event.sets || !event.sets.nodes) {
        console.log(`    ✗ No sets/matches in this event`);
        continue;
      }
      
      const totalSets = event.sets.pageInfo?.total || event.sets.nodes.length;
      console.log(`    Found ${event.sets.nodes.length} matches (${totalSets} total)`);

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

        // Everything this set writes -- both player rows and the match row --
        // commits together or not at all. See withTransaction.
        const setResult = await withTransaction(async (db) => {
          // Get or create players. Uses the same tolerant lookup as the participant
          // sync above -- an exact-match-only lookup here created a second row for
          // any player already stored in the legacy "SPONSOR | tag" form.
          // Sequential rather than parallel: they share one transaction connection.
          const p1Id = await findOrCreateUserId(p1Name, db);
          const p2Id = await findOrCreateUserId(p2Name, db);

          // Parse scores from displayScore.
          //
          // start.gg formats this as "PlayerName 2 - PlayerName 3", or "PlayerName
          // DQ" / "DQ" for a disqualification, or a bare "-" when the set has not
          // been reported. The separator " - " is therefore present in EVERY real
          // score string -- the previous `displayScore.includes('-')` test flagged
          // all of them as DQ and left the score-extraction branch unreachable, so
          // every synced match was stored 0-0.
          let scoreP1 = 0;
          let scoreP2 = 0;
          let isDQ = false;

          const displayScore = (set.displayScore || '').trim();
          if (displayScore) {
            if (/(^|\s)DQ(\s|$)/i.test(displayScore)) {
              isDQ = true;
            } else if (displayScore !== '-') {
              // "Name 2 - Name 3": take the trailing integer from each side.
              const parts = displayScore.split(' - ');
              if (parts.length === 2) {
                const p1Match = parts[0].match(/(\d+)\s*$/);
                const p2Match = parts[1].match(/(\d+)\s*$/);
                if (p1Match) scoreP1 = parseInt(p1Match[1], 10) || 0;
                if (p2Match) scoreP2 = parseInt(p2Match[1], 10) || 0;
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

          // The event is part of the identity of a set. Without it, the same pair
          // meeting in a same-named round ("Winners Round 1") of a second event of
          // the same tournament was treated as a duplicate and silently dropped.
          // The NULL branch adopts rows written before event_name existed.
          const [existingMatches] = await db.execute(
            `SELECT match_id, score_p1, score_p2, winner_id FROM matches
             WHERE tournament_id = ? AND player1_id = ? AND player2_id = ? AND round_name = ?
               AND (event_name = ? OR event_name IS NULL)
             ORDER BY (event_name = ?) DESC
             LIMIT 1`,
            [tournamentId, p1Id, p2Id, roundName, eventName, eventName]
          );

          if (existingMatches.length === 0) {
            // Insert new match
            await db.execute(
              `INSERT INTO matches (tournament_id, player1_id, player2_id, winner_id, round_name, event_name, score_p1, score_p2, match_time)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [tournamentId, p1Id, p2Id, winnerId, roundName, eventName, scoreP1, scoreP2, matchTime]
            );
            return { inserted: true, updated: false };
          } else {
            // Match exists - update if we have better data (actual scores instead of 0-0)
            const existingMatch = existingMatches[0];
            const existingHasScores = (existingMatch.score_p1 > 0 || existingMatch.score_p2 > 0);
            const newHasScores = (scoreP1 > 0 || scoreP2 > 0);
            const existingHasWinner = existingMatch.winner_id !== null;
            const newHasWinner = winnerId !== null;
          
            // Update if: new data has scores and existing doesn't, OR new data has winner and existing doesn't
            if ((newHasScores && !existingHasScores) || (newHasWinner && !existingHasWinner)) {
              await db.execute(
                `UPDATE matches SET score_p1 = ?, score_p2 = ?, winner_id = ?, match_time = ?, event_name = ? WHERE match_id = ?`,
                [
                  newHasScores ? scoreP1 : existingMatch.score_p1,
                  newHasScores ? scoreP2 : existingMatch.score_p2,
                  newHasWinner ? winnerId : existingMatch.winner_id,
                  matchTime,
                  eventName,
                  existingMatch.match_id
                ]
              );
              return { inserted: false, updated: true };
            }
            return { inserted: false, updated: false };
          }
        });

        if (setResult.inserted) matchesSynced++;
        if (setResult.updated) { matchesUpdated++; matchesUpdatedInEvent++; }
      }
      
      // Debug logging
      console.log(`    Processed: ${processedSets}, Skipped: noSlots=${skippedNoSlots}, noEntrant=${skippedNoEntrant}, noName=${skippedNoName}, Updated: ${matchesUpdatedInEvent}`);
      
      // Log first set for debugging if nothing was processed
    }

    console.log(`  ✓ Sync complete: ${playersSynced} players added, ${playersUpdated} players updated, ${matchesSynced} matches added, ${matchesUpdated} matches updated`);
    console.log(`========================================\n`);
    return {
      tournamentId, playersSynced, playersUpdated, matchesSynced, matchesUpdated,
      // `complete: false` means some data is missing; see `warnings`.
      complete: warnings.length === 0,
      warnings,
    };
  } catch (error) {
    console.error('✗ Error syncing tournament from start.gg:', error.message);
    throw error;
  }
}

/**
 * Runs `fn` inside a transaction on a single pooled connection.
 *
 * The sync had no transactions at all: every write was a standalone
 * pool.execute on an arbitrary pooled connection, so a failure part-way through
 * left the tournament row plus some users and some matches committed, with no
 * rollback and no way to tell how far it got.
 *
 * The unit of work is one set, not the whole sync -- a sync interleaves hundreds
 * of start.gg round-trips and can run for minutes, and holding a transaction
 * open across those would lock rows for the duration for no benefit. Per-set is
 * the boundary that matters: a match never lands without the player rows it
 * references.
 */
async function withTransaction(fn) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await fn(connection);
    await connection.commit();
    return result;
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error('  ✗ Rollback failed:', rollbackError.message);
    }
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Resolves a gamer tag to a user_id, creating the row if it does not exist.
 *
 * The lookup deliberately accepts three stored shapes: the bare tag, the legacy
 * "SPONSOR | tag" display form, and any row whose username ends in " | tag".
 * An exact-match-only lookup silently created duplicates for every player whose
 * row predates the sponsor-column split.
 *
 * `db` is a pooled connection when called inside a transaction, the pool itself
 * otherwise.
 */
async function findOrCreateUserId(gamerTag, db = pool) {
  const [rows] = await db.execute(
    `SELECT user_id FROM users
     WHERE username = ? OR username LIKE ?
     ORDER BY (username = ?) DESC
     LIMIT 1`,
    [gamerTag, `% | ${gamerTag}`, gamerTag]
  );
  if (rows.length > 0) return rows[0].user_id;

  const [result] = await db.execute('INSERT INTO users (username) VALUES (?)', [gamerTag]);
  return result.insertId;
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
    const sponsor = player.prefix || null;

    // Find or create user.
    //
    // The sponsor prefix belongs in its own column -- it must NOT be folded into
    // `username`. Previously this row was found by `username = gamerTag` and then
    // immediately overwritten with `${prefix} ${gamerTag}` (a space separator,
    // where the rest of the codebase uses ' | '), so the next sync's exact-match
    // lookup missed and the ' | ' LIKE fallback could not match either -- every
    // sync inserted a fresh duplicate.
    //
    // The lookup mirrors getOrCreateUser in dbHelpers: exact tag, the legacy
    // "SPONSOR | tag" display form, and the space-separated rows this function
    // used to create.
    let [userRows] = await pool.execute(
      `SELECT user_id, sponsor FROM users
       WHERE username = ?
       OR username = ?
       OR username LIKE ?
       OR username = ?
       ORDER BY (username = ?) DESC
       LIMIT 1`,
      [
        gamerTag,
        sponsor ? `${sponsor} | ${gamerTag}` : gamerTag,
        `% | ${gamerTag}`,
        sponsor ? `${sponsor} ${gamerTag}` : gamerTag,
        gamerTag,
      ]
    );

    let userId;
    if (userRows.length === 0) {
      const [result] = await pool.execute(
        'INSERT INTO users (username, sponsor, main_character) VALUES (?, ?, ?)',
        [gamerTag, sponsor, null]
      );
      userId = result.insertId;
    } else {
      userId = userRows[0].user_id;
      // Normalize any row that carries the prefix inside the username, and fill
      // in the sponsor column. Keeps repeat syncs idempotent.
      await pool.execute(
        'UPDATE users SET username = ?, sponsor = ? WHERE user_id = ?',
        [gamerTag, sponsor || userRows[0].sponsor || null, userId]
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
      // Strip "tournament/" prefix if present - start.gg returns full path slugs
      slug: t.slug ? t.slug.replace(/^tournament\//, '') : t.slug,
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

