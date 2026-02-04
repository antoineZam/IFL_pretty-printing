const pool = require('./db');

// Helper function to get or create a current tournament
async function getOrCreateCurrentTournament() {
  try {
    // Try to get a tournament with status 'active'
    let [rows] = await pool.execute(
      'SELECT * FROM tournaments WHERE status = ? ORDER BY tournament_id DESC LIMIT 1',
      ['active']
    );

    if (rows.length === 0) {
      // Create a new active tournament
      const [result] = await pool.execute(
        'INSERT INTO tournaments (name, season, status, game_version) VALUES (?, ?, ?, ?)',
        ['Current Tournament', 'Current Season', 'active', 'Tekken 8']
      );
      return result.insertId;
    }

    return rows[0].tournament_id;
  } catch (error) {
    console.error('Error getting/creating current tournament:', error);
    throw error;
  }
}

// Helper function to get or create a user
async function getOrCreateUser(displayName, team = null, flag = null) {
  try {
    // Parse displayName to extract sponsor and actual username
    // Format: "SPONSOR | PlayerName" or just "PlayerName"
    let username = displayName;
    let sponsor = team || null;
    
    if (displayName && displayName.includes(' | ')) {
      const parts = displayName.split(' | ');
      sponsor = parts[0];
      username = parts.slice(1).join(' | ');
    }
    
    // Search by multiple possible formats to avoid duplicates:
    // 1. Exact username match
    // 2. The full displayName (old format like "SPONSOR | Name")
    // 3. Any username ending with the player name after " | "
    let [rows] = await pool.execute(
      `SELECT * FROM users 
       WHERE username = ? 
       OR username = ?
       OR username LIKE ?`,
      [username, displayName, `% | ${username}`]
    );

    if (rows.length === 0) {
      // Create new user with sponsor in dedicated column
      const [result] = await pool.execute(
        'INSERT INTO users (username, sponsor, country) VALUES (?, ?, ?)',
        [username, sponsor, flag || null]
      );
      return result.insertId;
    }

    // Found existing user - update with latest data and fix username if needed
    const existingUser = rows[0];
    const needsUsernameFixed = existingUser.username.includes(' | ');
    const newSponsor = sponsor || existingUser.sponsor;
    const newFlag = flag || existingUser.country;
    
    // Update if username needs fixing, or sponsor/flag changed
    if (needsUsernameFixed || (sponsor && sponsor !== existingUser.sponsor) || (flag && flag !== existingUser.country)) {
      await pool.execute(
        'UPDATE users SET username = ?, sponsor = ?, country = ? WHERE user_id = ?',
        [username, newSponsor, newFlag, existingUser.user_id]
      );
    }

    return existingUser.user_id;
  } catch (error) {
    console.error('Error getting/creating user:', error);
    throw error;
  }
}

// IFL Match Data Functions
async function loadIFLData() {
  try {
    const tournamentId = await getOrCreateCurrentTournament();
    
    // Get the most recent match for the current tournament
    const [matches] = await pool.execute(
      `SELECT m.*, 
              p1.username as p1Name, p1.country as p1Flag,
              p2.username as p2Name, p2.country as p2Flag,
              t.name as tournamentName
       FROM matches m
       LEFT JOIN users p1 ON m.player1_id = p1.user_id
       LEFT JOIN users p2 ON m.player2_id = p2.user_id
       LEFT JOIN tournaments t ON m.tournament_id = t.tournament_id
       WHERE m.tournament_id = ?
       ORDER BY m.match_id DESC
       LIMIT 1`,
      [tournamentId]
    );

    if (matches.length === 0) {
      // Return default data
      return {
        p1Flag: 'fr', p1Team: 'Team 1', p1Name: 'Player 1',
        p2Flag: 'rn', p2Team: 'Team 2', p2Name: 'Player 2',
        p1Score: 0, p2Score: 0,
        round: 'Winners Round 1', eventNumber: '1'
      };
    }

    const match = matches[0];
    return {
      p1Flag: match.p1Flag || 'fr',
      p1Team: 'Team 1', // Teams not in DB schema, keeping default
      p1Name: match.p1Name || 'Player 1',
      p2Flag: match.p2Flag || 'rn',
      p2Team: 'Team 2',
      p2Name: match.p2Name || 'Player 2',
      p1Score: match.score_p1 || 0,
      p2Score: match.score_p2 || 0,
      round: match.round_name || 'Winners Round 1',
      eventNumber: tournamentId.toString()
    };
  } catch (error) {
    console.error('Error loading IFL data:', error);
    // Return default data on error
    return {
      p1Flag: 'fr', p1Team: 'Team 1', p1Name: 'Player 1',
      p2Flag: 'rn', p2Team: 'Team 2', p2Name: 'Player 2',
      p1Score: 0, p2Score: 0,
      round: 'Winners Round 1', eventNumber: '1'
    };
  }
}

async function saveIFLData(data) {
  try {
    const tournamentId = await getOrCreateCurrentTournament();
    
    // Get or create players
    const p1Id = await getOrCreateUser(data.p1Name, data.p1Team, data.p1Flag);
    const p2Id = await getOrCreateUser(data.p2Name, data.p2Team, data.p2Flag);

    // Check if there's an existing current match
    const [existingMatches] = await pool.execute(
      'SELECT match_id FROM matches WHERE tournament_id = ? ORDER BY match_id DESC LIMIT 1',
      [tournamentId]
    );

    if (existingMatches.length > 0) {
      // Update existing match
      await pool.execute(
        `UPDATE matches 
         SET player1_id = ?, player2_id = ?, score_p1 = ?, score_p2 = ?, 
             round_name = ?, match_time = NOW()
         WHERE match_id = ?`,
        [p1Id, p2Id, data.p1Score || 0, data.p2Score || 0, data.round || 'Winners Round 1', existingMatches[0].match_id]
      );
    } else {
      // Create new match
      await pool.execute(
        `INSERT INTO matches (tournament_id, player1_id, player2_id, score_p1, score_p2, round_name, match_time)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [tournamentId, p1Id, p2Id, data.p1Score || 0, data.p2Score || 0, data.round || 'Winners Round 1']
      );
    }
  } catch (error) {
    console.error('Error saving IFL data:', error);
    throw error;
  }
}

// Player History Functions
async function loadPlayerHistory() {
  try {
    const [rows] = await pool.execute(
      'SELECT username, sponsor, country FROM users ORDER BY username'
    );
    return rows.map(row => {
      // Build display name with sponsor prefix for overlay controllers
      const username = row.username || '';
      const sponsor = row.sponsor || '';
      const displayName = sponsor ? `${sponsor} | ${username}` : username;
      
      return {
        name: displayName, // Full display name with sponsor for overlay
        username: username, // Raw username for searching
        flag: row.country || '',
        team: sponsor // Sponsor/team from dedicated column
      };
    });
  } catch (error) {
    console.error('Error loading player history:', error);
    return [];
  }
}

async function savePlayerHistory(players) {
  try {
    for (const player of players) {
      if (player.name) {
        await getOrCreateUser(player.name, player.team, player.flag);
      }
    }
  } catch (error) {
    console.error('Error saving player history:', error);
    throw error;
  }
}

// Tag Team Data Functions (stored as JSON in a special table or matches)
// For now, we'll create a simple approach using a settings/state table
async function loadTagTeamData() {
  try {
    // Try to get from a settings table (we'll create this if needed)
    // For now, return default
    return {
      team1: {
        name: 'Team 1',
        tag: 'T1',
        players: [
          { name: 'Omnis', sponsor: 'IFF', active: true },
          { name: 'Kuro', sponsor: 'IFF', active: false }
        ],
        score: 0
      },
      team2: {
        name: 'Team 2',
        tag: 'T2',
        players: [
          { name: 'Challenger 1', sponsor: '', active: true },
          { name: 'Challenger 2', sponsor: '', active: false }
        ],
        score: 0
      },
      round: 'Winners Round 1'
    };
  } catch (error) {
    console.error('Error loading tag team data:', error);
    return {
      team1: {
        name: 'Team 1',
        tag: 'T1',
        players: [
          { name: 'Omnis', sponsor: 'IFF', active: true },
          { name: 'Kuro', sponsor: 'IFF', active: false }
        ],
        score: 0
      },
      team2: {
        name: 'Team 2',
        tag: 'T2',
        players: [
          { name: 'Challenger 1', sponsor: '', active: true },
          { name: 'Challenger 2', sponsor: '', active: false }
        ],
        score: 0
      },
      round: 'Winners Round 1'
    };
  }
}

async function saveTagTeamData(data) {
  try {
    // Tag team data is complex, for now we'll store it as JSON
    // This would require a settings table - for now just log
    console.log('Tag team data saved (not yet fully implemented in DB)');
  } catch (error) {
    console.error('Error saving tag team data:', error);
  }
}

// RIB Data Functions (stored as JSON)
async function loadRIBMatchCards() {
  try {
    // RIB data is complex JSON, we'll need a settings table
    // For now return default
    return {
      eventTitle: "THE RUNBACK",
      eventSubtitle: "THE FINAL CHAPTER",
      partNumber: "01",
      mainEvent: { p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      matches: [],
      singleMatch: { matchTitle: "", format: "", p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      sponsors: { presenter: "", association: "" }
    };
  } catch (error) {
    console.error('Error loading RIB match cards:', error);
    return {
      eventTitle: "THE RUNBACK",
      eventSubtitle: "THE FINAL CHAPTER",
      partNumber: "01",
      mainEvent: { p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      matches: [],
      singleMatch: { matchTitle: "", format: "", p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      sponsors: { presenter: "", association: "" }
    };
  }
}

async function saveRIBMatchCards(data) {
  try {
    console.log('RIB match cards saved (not yet fully implemented in DB)');
  } catch (error) {
    console.error('Error saving RIB match cards:', error);
  }
}

async function loadRIBPlayerStats() {
  try {
    return { players: [] };
  } catch (error) {
    console.error('Error loading RIB player stats:', error);
    return { players: [] };
  }
}

async function saveRIBPlayerStats(data) {
  try {
    console.log('RIB player stats saved (not yet fully implemented in DB)');
  } catch (error) {
    console.error('Error saving RIB player stats:', error);
  }
}

async function loadRIBStreamData() {
  try {
    return { matchTitle: "", p1Name: "", p1Flag: "", p1Score: 0, p2Name: "", p2Flag: "", p2Score: 0 };
  } catch (error) {
    console.error('Error loading RIB stream data:', error);
    return { matchTitle: "", p1Name: "", p1Flag: "", p1Score: 0, p2Name: "", p2Flag: "", p2Score: 0 };
  }
}

async function saveRIBStreamData(data) {
  try {
    console.log('RIB stream data saved (not yet fully implemented in DB)');
  } catch (error) {
    console.error('Error saving RIB stream data:', error);
  }
}

// --- IFF Player Data Functions (iff_players table) ---

async function getAllIFFPlayers() {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM iff_players ORDER BY name ASC`
    );
    return rows;
  } catch (error) {
    console.error('Error getting all IFF players:', error);
    throw error;
  }
}

async function getIFFPlayer(id) {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM iff_players WHERE id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error getting IFF player:', error);
    throw error;
  }
}

async function saveIFFPlayer(playerData) {
  try {
    const {
      id,
      name,
      polaris_id,
      character_name,
      division,
      rank_name,
      tekken_power,
      prowess,
      iff8_ranking,
      iff8_record,
      iff8_record_details,
      iff_history,
      ranked_wins,
      ranked_losses,
      ranked_wl_rate,
      player_wins,
      player_losses,
      player_wl_rate,
      offense_rating,
      defense_rating,
      consistency_rating,
      adaptability_rating,
      clutch_rating,
      experience_rating
    } = playerData;

    if (id) {
      // Update existing player
      await pool.execute(
        `UPDATE iff_players SET
          name = ?,
          polaris_id = ?,
          character_name = ?,
          division = ?,
          rank_name = ?,
          tekken_power = ?,
          prowess = ?,
          iff8_ranking = ?,
          iff8_record = ?,
          iff8_record_details = ?,
          iff_history = ?,
          ranked_wins = ?,
          ranked_losses = ?,
          ranked_wl_rate = ?,
          player_wins = ?,
          player_losses = ?,
          player_wl_rate = ?,
          offense_rating = ?,
          defense_rating = ?,
          consistency_rating = ?,
          adaptability_rating = ?,
          clutch_rating = ?,
          experience_rating = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [
          name, polaris_id || null, character_name || null, division || null,
          rank_name || null, tekken_power || 0, prowess || 0,
          iff8_ranking || null, iff8_record || null, iff8_record_details || null,
          iff_history || null, ranked_wins || 0, ranked_losses || 0,
          ranked_wl_rate || '0%', player_wins || 0, player_losses || 0,
          player_wl_rate || '0%', offense_rating || 50, defense_rating || 50,
          consistency_rating || 50, adaptability_rating || 50,
          clutch_rating || 50, experience_rating || 50, id
        ]
      );
      return await getIFFPlayer(id);
    } else {
      // Insert new player
      const [result] = await pool.execute(
        `INSERT INTO iff_players (
          name, polaris_id, character_name, division, rank_name,
          tekken_power, prowess, iff8_ranking, iff8_record, iff8_record_details,
          iff_history, ranked_wins, ranked_losses, ranked_wl_rate,
          player_wins, player_losses, player_wl_rate,
          offense_rating, defense_rating, consistency_rating,
          adaptability_rating, clutch_rating, experience_rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, polaris_id || null, character_name || null, division || null,
          rank_name || null, tekken_power || 0, prowess || 0,
          iff8_ranking || null, iff8_record || null, iff8_record_details || null,
          iff_history || null, ranked_wins || 0, ranked_losses || 0,
          ranked_wl_rate || '0%', player_wins || 0, player_losses || 0,
          player_wl_rate || '0%', offense_rating || 50, defense_rating || 50,
          consistency_rating || 50, adaptability_rating || 50,
          clutch_rating || 50, experience_rating || 50
        ]
      );
      return await getIFFPlayer(result.insertId);
    }
  } catch (error) {
    console.error('Error saving IFF player:', error);
    throw error;
  }
}

async function deleteIFFPlayer(id) {
  try {
    await pool.execute(`DELETE FROM iff_players WHERE id = ?`, [id]);
    return true;
  } catch (error) {
    console.error('Error deleting IFF player:', error);
    throw error;
  }
}

// ===== Love & War Team Functions =====

async function getAllLoveAndWarTeams() {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        t.*,
        p1.name as player_1_name,
        p1.character_name as player_1_character,
        p1.division as player_1_division,
        p1.iff8_ranking as player_1_iff_ranking,
        p1.iff8_record as player_1_iff_record,
        p1.iff_history as player_1_iff_history,
        p1.rank_name as player_1_tekken_rank,
        p1.prowess as player_1_tekken_prowess,
        p1.ranked_wins as player_1_ranked_wins,
        p1.ranked_losses as player_1_ranked_losses,
        p1.ranked_wl_rate as player_1_ranked_wl_rate,
        p2.name as player_2_name,
        p2.character_name as player_2_character,
        p2.division as player_2_division,
        p2.iff8_ranking as player_2_iff_ranking,
        p2.iff8_record as player_2_iff_record,
        p2.iff_history as player_2_iff_history,
        p2.rank_name as player_2_tekken_rank,
        p2.prowess as player_2_tekken_prowess,
        p2.ranked_wins as player_2_ranked_wins,
        p2.ranked_losses as player_2_ranked_losses,
        p2.ranked_wl_rate as player_2_ranked_wl_rate
      FROM iff_love_n_war_teams t
      LEFT JOIN iff_players p1 ON t.player_1_id = p1.id
      LEFT JOIN iff_players p2 ON t.player_2_id = p2.id
      ORDER BY t.team_name ASC
    `);
    return rows;
  } catch (error) {
    console.error('Error getting all Love & War teams:', error);
    throw error;
  }
}

async function getLoveAndWarTeam(id) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        t.*,
        p1.name as player_1_name,
        p1.character_name as player_1_character,
        p1.division as player_1_division,
        p1.iff8_ranking as player_1_iff_ranking,
        p1.iff8_record as player_1_iff_record,
        p1.iff_history as player_1_iff_history,
        p1.rank_name as player_1_tekken_rank,
        p1.prowess as player_1_tekken_prowess,
        p1.ranked_wins as player_1_ranked_wins,
        p1.ranked_losses as player_1_ranked_losses,
        p1.ranked_wl_rate as player_1_ranked_wl_rate,
        p2.name as player_2_name,
        p2.character_name as player_2_character,
        p2.division as player_2_division,
        p2.iff8_ranking as player_2_iff_ranking,
        p2.iff8_record as player_2_iff_record,
        p2.iff_history as player_2_iff_history,
        p2.rank_name as player_2_tekken_rank,
        p2.prowess as player_2_tekken_prowess,
        p2.ranked_wins as player_2_ranked_wins,
        p2.ranked_losses as player_2_ranked_losses,
        p2.ranked_wl_rate as player_2_ranked_wl_rate
      FROM iff_love_n_war_teams t
      LEFT JOIN iff_players p1 ON t.player_1_id = p1.id
      LEFT JOIN iff_players p2 ON t.player_2_id = p2.id
      WHERE t.id = ?
    `, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error getting Love & War team:', error);
    throw error;
  }
}

async function saveLoveAndWarTeam(team) {
  try {
    const { id, team_name, player_1_id, player_2_id } = team;
    
    if (id) {
      // Update existing team
      await pool.execute(
        `UPDATE iff_love_n_war_teams 
         SET team_name = ?, player_1_id = ?, player_2_id = ?
         WHERE id = ?`,
        [team_name, player_1_id, player_2_id, id]
      );
      return await getLoveAndWarTeam(id);
    } else {
      // Insert new team
      const [result] = await pool.execute(
        `INSERT INTO iff_love_n_war_teams (team_name, player_1_id, player_2_id)
         VALUES (?, ?, ?)`,
        [team_name, player_1_id, player_2_id]
      );
      return await getLoveAndWarTeam(result.insertId);
    }
  } catch (error) {
    console.error('Error saving Love & War team:', error);
    throw error;
  }
}

async function deleteLoveAndWarTeam(id) {
  try {
    await pool.execute(`DELETE FROM iff_love_n_war_teams WHERE id = ?`, [id]);
    return true;
  } catch (error) {
    console.error('Error deleting Love & War team:', error);
    throw error;
  }
}

// ===== Love & War Tournament Functions =====

async function getAllLnWTournaments() {
  try {
    const [rows] = await pool.execute(`
      SELECT t.*, 
             COUNT(DISTINCT tt.team_id) as team_count,
             COUNT(DISTINCT m.id) as match_count
      FROM iff_lnw_tournaments t
      LEFT JOIN iff_lnw_tournament_teams tt ON t.id = tt.tournament_id
      LEFT JOIN iff_lnw_matches m ON t.id = m.tournament_id
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `);
    return rows;
  } catch (error) {
    console.error('Error getting all LnW tournaments:', error);
    throw error;
  }
}

async function getLnWTournament(id) {
  try {
    const [tournaments] = await pool.execute(`
      SELECT * FROM iff_lnw_tournaments WHERE id = ?
    `, [id]);
    
    if (tournaments.length === 0) return null;
    
    const tournament = tournaments[0];
    
    // Get groups in this tournament
    const [groups] = await pool.execute(`
      SELECT g.*,
             COUNT(DISTINCT tt.team_id) as team_count,
             COUNT(DISTINCT m.id) as match_count
      FROM iff_lnw_groups g
      LEFT JOIN iff_lnw_tournament_teams tt ON g.id = tt.group_id
      LEFT JOIN iff_lnw_matches m ON g.id = m.group_id
      WHERE g.tournament_id = ?
      GROUP BY g.id
      ORDER BY g.group_order ASC
    `, [id]);
    
    // Get tournament teams with full team details (including group info)
    const [teams] = await pool.execute(`
      SELECT tt.*, 
             t.team_name,
             t.player_1_id, t.player_2_id,
             p1.name as player_1_name, p1.character_name as player_1_character,
             p2.name as player_2_name, p2.character_name as player_2_character,
             g.name as group_name
      FROM iff_lnw_tournament_teams tt
      JOIN iff_love_n_war_teams t ON tt.team_id = t.id
      LEFT JOIN iff_players p1 ON t.player_1_id = p1.id
      LEFT JOIN iff_players p2 ON t.player_2_id = p2.id
      LEFT JOIN iff_lnw_groups g ON tt.group_id = g.id
      WHERE tt.tournament_id = ?
      ORDER BY tt.group_id ASC, tt.seed ASC, tt.id ASC
    `, [id]);
    
    // Get matches (including group info)
    const [matches] = await pool.execute(`
      SELECT m.*,
             t1.team_name as team_1_name,
             t2.team_name as team_2_name,
             w.team_name as winner_name,
             g.name as group_name
      FROM iff_lnw_matches m
      LEFT JOIN iff_love_n_war_teams t1 ON m.team_1_id = t1.id
      LEFT JOIN iff_love_n_war_teams t2 ON m.team_2_id = t2.id
      LEFT JOIN iff_love_n_war_teams w ON m.winner_team_id = w.id
      LEFT JOIN iff_lnw_groups g ON m.group_id = g.id
      WHERE m.tournament_id = ?
      ORDER BY m.group_id ASC, m.round_order ASC, m.match_number ASC
    `, [id]);
    
    tournament.groups = groups;
    tournament.teams = teams;
    tournament.matches = matches;
    
    return tournament;
  } catch (error) {
    console.error('Error getting LnW tournament:', error);
    throw error;
  }
}

async function saveLnWTournament(tournament) {
  try {
    const { id, name, format, status, start_date } = tournament;
    
    if (id) {
      // Update existing tournament
      await pool.execute(
        `UPDATE iff_lnw_tournaments 
         SET name = ?, format = ?, status = ?, start_date = ?
         WHERE id = ?`,
        [name, format, status, start_date || null, id]
      );
      return await getLnWTournament(id);
    } else {
      // Insert new tournament
      const [result] = await pool.execute(
        `INSERT INTO iff_lnw_tournaments (name, format, status, start_date)
         VALUES (?, ?, ?, ?)`,
        [name, format, status || 'setup', start_date || null]
      );
      return await getLnWTournament(result.insertId);
    }
  } catch (error) {
    console.error('Error saving LnW tournament:', error);
    throw error;
  }
}

async function deleteLnWTournament(id) {
  try {
    // Delete all related data (order matters due to foreign key constraints)
    await pool.execute(`DELETE FROM iff_lnw_matches WHERE tournament_id = ?`, [id]);
    await pool.execute(`DELETE FROM iff_lnw_tournament_teams WHERE tournament_id = ?`, [id]);
    await pool.execute(`DELETE FROM iff_lnw_groups WHERE tournament_id = ?`, [id]);
    await pool.execute(`DELETE FROM iff_lnw_tournaments WHERE id = ?`, [id]);
    return true;
  } catch (error) {
    console.error('Error deleting LnW tournament:', error);
    throw error;
  }
}

async function addTeamToTournament(tournamentId, teamId, seed = null) {
  try {
    await pool.execute(
      `INSERT INTO iff_lnw_tournament_teams (tournament_id, team_id, seed)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE seed = ?`,
      [tournamentId, teamId, seed, seed]
    );
    return true;
  } catch (error) {
    console.error('Error adding team to tournament:', error);
    throw error;
  }
}

async function removeTeamFromTournament(tournamentId, teamId) {
  try {
    await pool.execute(
      `DELETE FROM iff_lnw_tournament_teams 
       WHERE tournament_id = ? AND team_id = ?`,
      [tournamentId, teamId]
    );
    return true;
  } catch (error) {
    console.error('Error removing team from tournament:', error);
    throw error;
  }
}

async function saveLnWMatch(match) {
  try {
    const { 
      id, tournament_id, group_id, round, round_order, match_number,
      team_1_id, team_2_id, team_1_score, team_2_score,
      winner_team_id, next_match_id, is_complete, bracket_position
    } = match;
    
    if (id) {
      // Update existing match
      await pool.execute(
        `UPDATE iff_lnw_matches 
         SET team_1_id = ?, team_2_id = ?, team_1_score = ?, team_2_score = ?,
             winner_team_id = ?, is_complete = ?, next_match_id = ?, group_id = ?
         WHERE id = ?`,
        [team_1_id || null, team_2_id || null, team_1_score || 0, team_2_score || 0,
         winner_team_id || null, is_complete || false, next_match_id || null, group_id || null, id]
      );
      
      // Update team records if match is complete
      if (is_complete && winner_team_id) {
        const loserTeamId = winner_team_id === team_1_id ? team_2_id : team_1_id;
        
        await pool.execute(
          `UPDATE iff_lnw_tournament_teams 
           SET wins = wins + 1 
           WHERE tournament_id = ? AND team_id = ?`,
          [tournament_id, winner_team_id]
        );
        
        if (loserTeamId) {
          await pool.execute(
            `UPDATE iff_lnw_tournament_teams 
             SET losses = losses + 1 
             WHERE tournament_id = ? AND team_id = ?`,
            [tournament_id, loserTeamId]
          );
        }
      }
      
      return { id, ...match };
    } else {
      // Insert new match
      const [result] = await pool.execute(
        `INSERT INTO iff_lnw_matches 
         (tournament_id, group_id, round, round_order, match_number, team_1_id, team_2_id,
          team_1_score, team_2_score, winner_team_id, next_match_id, is_complete, bracket_position)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tournament_id, group_id || null, round, round_order, match_number, 
         team_1_id || null, team_2_id || null, team_1_score || 0, team_2_score || 0,
         winner_team_id || null, next_match_id || null, is_complete || false, bracket_position || null]
      );
      return { id: result.insertId, ...match };
    }
  } catch (error) {
    console.error('Error saving LnW match:', error);
    throw error;
  }
}

async function getLnWTournamentRankings(tournamentId) {
  try {
    const [rankings] = await pool.execute(`
      SELECT tt.*,
             t.team_name,
             p1.name as player_1_name, p1.character_name as player_1_character,
             p2.name as player_2_name, p2.character_name as player_2_character
      FROM iff_lnw_tournament_teams tt
      JOIN iff_love_n_war_teams t ON tt.team_id = t.id
      LEFT JOIN iff_players p1 ON t.player_1_id = p1.id
      LEFT JOIN iff_players p2 ON t.player_2_id = p2.id
      WHERE tt.tournament_id = ?
      ORDER BY 
        CASE WHEN tt.placement IS NOT NULL THEN tt.placement ELSE 999 END ASC,
        tt.wins DESC,
        tt.losses ASC,
        tt.seed ASC
    `, [tournamentId]);
    return rankings;
  } catch (error) {
    console.error('Error getting LnW tournament rankings:', error);
    throw error;
  }
}

async function updateTournamentPlacements(tournamentId, placements) {
  try {
    // placements is an array of { team_id, placement }
    for (const { team_id, placement } of placements) {
      await pool.execute(
        `UPDATE iff_lnw_tournament_teams 
         SET placement = ? 
         WHERE tournament_id = ? AND team_id = ?`,
        [placement, tournamentId, team_id]
      );
    }
    return true;
  } catch (error) {
    console.error('Error updating tournament placements:', error);
    throw error;
  }
}

// ===== Love & War Group Functions =====

async function getLnWGroups(tournamentId) {
  try {
    const [groups] = await pool.execute(`
      SELECT g.*,
             COUNT(DISTINCT tt.team_id) as team_count,
             COUNT(DISTINCT m.id) as match_count
      FROM iff_lnw_groups g
      LEFT JOIN iff_lnw_tournament_teams tt ON g.id = tt.group_id
      LEFT JOIN iff_lnw_matches m ON g.id = m.group_id
      WHERE g.tournament_id = ?
      GROUP BY g.id
      ORDER BY g.group_order ASC
    `, [tournamentId]);
    return groups;
  } catch (error) {
    console.error('Error getting LnW groups:', error);
    throw error;
  }
}

async function getLnWGroup(groupId) {
  try {
    const [groups] = await pool.execute(`
      SELECT * FROM iff_lnw_groups WHERE id = ?
    `, [groupId]);
    
    if (groups.length === 0) return null;
    
    const group = groups[0];
    
    // Get teams in this group
    const [teams] = await pool.execute(`
      SELECT tt.*, 
             t.team_name,
             t.player_1_id, t.player_2_id,
             p1.name as player_1_name, p1.character_name as player_1_character,
             p2.name as player_2_name, p2.character_name as player_2_character
      FROM iff_lnw_tournament_teams tt
      JOIN iff_love_n_war_teams t ON tt.team_id = t.id
      LEFT JOIN iff_players p1 ON t.player_1_id = p1.id
      LEFT JOIN iff_players p2 ON t.player_2_id = p2.id
      WHERE tt.group_id = ?
      ORDER BY tt.seed ASC, tt.id ASC
    `, [groupId]);
    
    // Get matches for this group
    const [matches] = await pool.execute(`
      SELECT m.*,
             t1.team_name as team_1_name,
             t2.team_name as team_2_name,
             w.team_name as winner_name
      FROM iff_lnw_matches m
      LEFT JOIN iff_love_n_war_teams t1 ON m.team_1_id = t1.id
      LEFT JOIN iff_love_n_war_teams t2 ON m.team_2_id = t2.id
      LEFT JOIN iff_love_n_war_teams w ON m.winner_team_id = w.id
      WHERE m.group_id = ?
      ORDER BY m.round_order ASC, m.match_number ASC
    `, [groupId]);
    
    group.teams = teams;
    group.matches = matches;
    
    return group;
  } catch (error) {
    console.error('Error getting LnW group:', error);
    throw error;
  }
}

async function saveLnWGroup(group) {
  try {
    const { id, tournament_id, name, group_order, status } = group;
    
    if (id) {
      await pool.execute(
        `UPDATE iff_lnw_groups 
         SET name = ?, group_order = ?, status = ?
         WHERE id = ?`,
        [name, group_order || 1, status || 'setup', id]
      );
      return await getLnWGroup(id);
    } else {
      // Get the next group_order
      const [maxOrder] = await pool.execute(
        `SELECT COALESCE(MAX(group_order), 0) + 1 as next_order 
         FROM iff_lnw_groups WHERE tournament_id = ?`,
        [tournament_id]
      );
      const nextOrder = group_order || maxOrder[0].next_order;
      
      const [result] = await pool.execute(
        `INSERT INTO iff_lnw_groups (tournament_id, name, group_order, status)
         VALUES (?, ?, ?, ?)`,
        [tournament_id, name, nextOrder, status || 'setup']
      );
      return await getLnWGroup(result.insertId);
    }
  } catch (error) {
    console.error('Error saving LnW group:', error);
    throw error;
  }
}

async function deleteLnWGroup(groupId) {
  try {
    // Unassign teams from this group
    await pool.execute(`UPDATE iff_lnw_tournament_teams SET group_id = NULL WHERE group_id = ?`, [groupId]);
    // Delete matches for this group
    await pool.execute(`DELETE FROM iff_lnw_matches WHERE group_id = ?`, [groupId]);
    // Delete the group
    await pool.execute(`DELETE FROM iff_lnw_groups WHERE id = ?`, [groupId]);
    return true;
  } catch (error) {
    console.error('Error deleting LnW group:', error);
    throw error;
  }
}

async function assignTeamToGroup(tournamentId, teamId, groupId) {
  try {
    await pool.execute(
      `UPDATE iff_lnw_tournament_teams 
       SET group_id = ?
       WHERE tournament_id = ? AND team_id = ?`,
      [groupId, tournamentId, teamId]
    );
    return true;
  } catch (error) {
    console.error('Error assigning team to group:', error);
    throw error;
  }
}

async function removeTeamFromGroup(tournamentId, teamId) {
  try {
    await pool.execute(
      `UPDATE iff_lnw_tournament_teams 
       SET group_id = NULL
       WHERE tournament_id = ? AND team_id = ?`,
      [tournamentId, teamId]
    );
    return true;
  } catch (error) {
    console.error('Error removing team from group:', error);
    throw error;
  }
}

module.exports = {
  loadIFLData,
  saveIFLData,
  loadPlayerHistory,
  savePlayerHistory,
  loadTagTeamData,
  saveTagTeamData,
  loadRIBMatchCards,
  saveRIBMatchCards,
  loadRIBPlayerStats,
  saveRIBPlayerStats,
  loadRIBStreamData,
  saveRIBStreamData,
  // IFF Player functions
  getAllIFFPlayers,
  getIFFPlayer,
  saveIFFPlayer,
  deleteIFFPlayer,
  // Love & War Team functions
  getAllLoveAndWarTeams,
  getLoveAndWarTeam,
  saveLoveAndWarTeam,
  deleteLoveAndWarTeam,
  // Love & War Tournament functions
  getAllLnWTournaments,
  getLnWTournament,
  saveLnWTournament,
  deleteLnWTournament,
  addTeamToTournament,
  removeTeamFromTournament,
  saveLnWMatch,
  getLnWTournamentRankings,
  updateTournamentPlacements,
  // Love & War Group functions
  getLnWGroups,
  getLnWGroup,
  saveLnWGroup,
  deleteLnWGroup,
  assignTeamToGroup,
  removeTeamFromGroup
};

