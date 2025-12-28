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
  saveRIBStreamData
};

