require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const dbHelpers = require('./dbHelpers');
const startggSync = require('./startggSync');
const startgg = require('./startgg');

// Set default connection key
const CONNECTION_KEY = process.env.CONNECTION_KEY;
const RIB_ACCESS_KEY = process.env.RIB_ACCESS_KEY;

if (!CONNECTION_KEY) {
    console.error("FATAL ERROR: CONNECTION_KEY is not defined in your .env file.");
    console.error("Please create a file named .env in the project root and add the following line:");
    console.error("CONNECTION_KEY=your_secret_key_here");
    process.exit(1); // Stop the server if the key is not configured
}

if (!RIB_ACCESS_KEY) {
    console.warn("WARNING: RIB_ACCESS_KEY is not defined in your .env file.");
    console.warn("Run It Back section will be accessible without additional authentication.");
}

console.log('Connection key loaded successfully.');
if (RIB_ACCESS_KEY) {
    console.log('RIB access key loaded successfully.');
}

// Check for start.gg API key
if (process.env.STARTGG_API_KEY) {
    console.log('start.gg API key loaded successfully.');
} else {
    console.warn('WARNING: STARTGG_API_KEY is not defined - start.gg integration disabled');
}

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve React App in production
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Serve static files from 'source' directory, now inside client/public
app.use('/source', express.static(path.join(__dirname, 'client', 'public', 'source')));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define absolute paths for safety (still needed for static file serving)
const SOURCE_DIR = path.join(__dirname, 'client', 'public', 'source');

// Ensure the source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
}

// --- DATA MANAGEMENT ---
// All data is now loaded from database

// Initialize state variables (will be loaded asynchronously)
let overlayData = null;
let tagTeamData = null;
let playerHistory = [];
let ribMatchCards = null;
let ribPlayerStats = null;
let ribStreamData = null;

// Load initial state from database
async function initializeData() {
  try {
    overlayData = await dbHelpers.loadIFLData();
    tagTeamData = await dbHelpers.loadTagTeamData();
    playerHistory = await dbHelpers.loadPlayerHistory();
    ribMatchCards = await dbHelpers.loadRIBMatchCards();
    ribPlayerStats = await dbHelpers.loadRIBPlayerStats();
    ribStreamData = await dbHelpers.loadRIBStreamData();
    console.log('Data loaded from database successfully');
  } catch (error) {
    console.error('Error initializing data from database:', error);
    // Set defaults on error
    overlayData = {
      p1Flag: 'fr', p1Team: 'Team 1', p1Name: 'Player 1',
      p2Flag: 'rn', p2Team: 'Team 2', p2Name: 'Player 2',
      p1Score: 0, p2Score: 0,
      round: 'Winners Round 1', eventNumber: '1'
    };
    tagTeamData = {
      team1: { name: 'Team 1', tag: 'T1', players: [], score: 0 },
      team2: { name: 'Team 2', tag: 'T2', players: [], score: 0 },
      round: 'Winners Round 1'
    };
    playerHistory = [];
    ribMatchCards = {
      eventTitle: "THE RUNBACK",
      eventSubtitle: "THE FINAL CHAPTER",
      partNumber: "01",
      mainEvent: { p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      matches: [],
      singleMatch: { matchTitle: "", format: "", p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
      sponsors: { presenter: "", association: "" }
    };
    ribPlayerStats = { players: [] };
    ribStreamData = { matchTitle: "", p1Name: "", p1Flag: "", p1Score: 0, p2Name: "", p2Flag: "", p2Score: 0 };
  }
}

// Initialize data on startup
initializeData();

// Run It Back overlay visibility state
let ribOverlayState = {
    showMatchCard: false,
    showPlayerStats: false,
    showPartOne: false,
    showStreamOverlay: false,
    selectedMatchIndex: 0,
    selectedPlayerIndex: 0,
    animationTrigger: 0
};

// --- API ROUTES ---
app.post('/api/auth', (req, res) => {
    if (req.body.key === CONNECTION_KEY) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid connection key' });
    }
});

// RIB Access Key Authentication
app.post('/api/rib-auth', (req, res) => {
    // If no RIB key is configured, allow access
    if (!RIB_ACCESS_KEY) {
        res.status(200).json({ success: true, message: 'No RIB key required' });
        return;
    }
    
    if (req.body.key === RIB_ACCESS_KEY) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid RIB access key' });
    }
});

// Check if RIB key is required
app.get('/api/rib-auth/required', (req, res) => {
    res.status(200).json({ required: !!RIB_ACCESS_KEY });
});

app.get('/api/history', async (req, res) => {
    try {
        const history = await dbHelpers.loadPlayerHistory();
        res.status(200).json(history);
    } catch (error) {
        console.error('Error loading history:', error);
        res.status(500).json({ error: 'Failed to load history' });
    }
});

app.post('/api/history', async (req, res) => {
    try {
        const newPlayers = req.body; // Expecting an array of players
        await dbHelpers.savePlayerHistory(newPlayers);
        const updatedHistory = await dbHelpers.loadPlayerHistory();
        res.status(200).json(updatedHistory);
    } catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({ error: 'Failed to save history' });
    }
});

app.delete('/api/history', async (req, res) => {
    try {
        const { name } = req.body;
        const pool = require('./db');
        const [result] = await pool.execute('DELETE FROM users WHERE username = ?', [name]);
        
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Player deleted.' });
        } else {
            res.status(404).json({ success: false, message: 'Player not found.' });
        }
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({ error: 'Failed to delete player' });
    }
});

// --- RUN IT BACK API ROUTES ---

app.get('/api/rib/match-cards', async (req, res) => {
    try {
        const data = await dbHelpers.loadRIBMatchCards();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error loading RIB match cards:', error);
        res.status(500).json({ error: 'Failed to load match cards' });
    }
});

app.post('/api/rib/match-cards', async (req, res) => {
    try {
        ribMatchCards = req.body;
        await dbHelpers.saveRIBMatchCards(ribMatchCards);
        io.emit('rib-match-cards-update', ribMatchCards);
        res.status(200).json(ribMatchCards);
    } catch (error) {
        console.error('Error saving RIB match cards:', error);
        res.status(500).json({ error: 'Failed to save match cards' });
    }
});

app.get('/api/rib/player-stats', async (req, res) => {
    try {
        const data = await dbHelpers.loadRIBPlayerStats();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error loading RIB player stats:', error);
        res.status(500).json({ error: 'Failed to load player stats' });
    }
});

app.post('/api/rib/player-stats', async (req, res) => {
    try {
        ribPlayerStats = req.body;
        await dbHelpers.saveRIBPlayerStats(ribPlayerStats);
        io.emit('rib-player-stats-update', ribPlayerStats);
        res.status(200).json(ribPlayerStats);
    } catch (error) {
        console.error('Error saving RIB player stats:', error);
        res.status(500).json({ error: 'Failed to save player stats' });
    }
});

app.get('/api/rib/stream-data', async (req, res) => {
    try {
        const data = await dbHelpers.loadRIBStreamData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error loading RIB stream data:', error);
        res.status(500).json({ error: 'Failed to load stream data' });
    }
});

app.post('/api/rib/stream-data', async (req, res) => {
    try {
        ribStreamData = req.body;
        await dbHelpers.saveRIBStreamData(ribStreamData);
        io.emit('rib-stream-data-update', ribStreamData);
        res.status(200).json(ribStreamData);
    } catch (error) {
        console.error('Error saving RIB stream data:', error);
        res.status(500).json({ error: 'Failed to save stream data' });
    }
});

app.get('/api/rib/overlay-state', (req, res) => {
    res.status(200).json(ribOverlayState);
});

app.post('/api/rib/overlay-state', (req, res) => {
    ribOverlayState = { ...ribOverlayState, ...req.body };
    io.emit('rib-overlay-state-update', ribOverlayState);
    res.status(200).json(ribOverlayState);
});

// --- START.GG API ROUTES ---

// Search for tournaments (e.g., "iron-fist-league")
app.get('/api/startgg/search', async (req, res) => {
    try {
        const { term } = req.query;
        if (!term) {
            return res.status(400).json({ error: 'Search term is required' });
        }
        const tournaments = await startggSync.findTournamentsByTerm(term);
        res.status(200).json(tournaments);
    } catch (error) {
        console.error('Error searching tournaments:', error);
        res.status(500).json({ error: error.message || 'Failed to search tournaments' });
    }
});

// Get all Iron Fist League tournaments
app.get('/api/startgg/ifl/tournaments', async (req, res) => {
    try {
        const tournaments = await startgg.searchIronFistLeagueTournaments(50);
        res.status(200).json(tournaments);
    } catch (error) {
        console.error('Error fetching IFL tournaments:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch IFL tournaments' });
    }
});

// Test fetching a specific slug directly
app.get('/api/startgg/test/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(`Testing slug: ${slug}`);
        const data = await startgg.getTournamentBySlug(slug);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error testing slug:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint - search for a tournament by full slug (no DB needed)
app.get('/api/startgg/search-slug/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(`\nSearching for tournament slug: ${slug}`);
        
        // Try with and without tournament/ prefix
        const slugsToTry = [
            slug,
            `tournament/${slug}`,
            slug.replace('tournament/', '')
        ];
        
        for (const s of slugsToTry) {
            try {
                console.log(`  Trying: ${s}`);
                const data = await startgg.getTournamentBySlug(s);
                if (data && data.tournament) {
                    console.log(`  ✓ Found: ${data.tournament.name}`);
                    return res.json(data);
                }
            } catch (e) {
                console.log(`  ✗ Not found: ${e.message}`);
            }
        }
        
        res.status(404).json({ error: 'Tournament not found with any slug variation' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get specific IFL tournament by number (e.g., iron-fist-league-1, iron-fist-league-2-finals)
app.get('/api/startgg/ifl/:number', async (req, res) => {
    try {
        const { number } = req.params;
        const { suffix } = req.query; // Optional suffix like "finals", "grand-finals"
        const data = await startgg.getIFLTournamentByNumber(number, suffix || '');
        if (!data) {
            return res.status(404).json({ error: 'Tournament not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching IFL tournament:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch IFL tournament' });
    }
});

// Sync all Iron Fist League tournaments to database
app.post('/api/startgg/ifl/sync-all', async (req, res) => {
    console.log('\n========================================');
    console.log('SYNC ALL IFL TOURNAMENTS - Starting');
    console.log('========================================\n');
    
    try {
        console.log('Step 1: Searching for IFL tournaments...');
        const tournaments = await startgg.searchIronFistLeagueTournaments(50);
        console.log(`Found ${tournaments.length} tournaments to sync\n`);
        
        const results = [];
        
        for (let i = 0; i < tournaments.length; i++) {
            const tournament = tournaments[i];
            console.log(`\n[${i + 1}/${tournaments.length}] Syncing: ${tournament.name}`);
            console.log(`  Slug: ${tournament.slug}`);
            
            try {
                const result = await startggSync.syncTournamentFromStartGG(tournament.slug);
                console.log(`  ✓ Success: ${result.playersSynced} players added, ${result.playersUpdated || 0} updated, ${result.matchesSynced} matches added, ${result.matchesUpdated || 0} updated`);
                results.push({
                    slug: tournament.slug,
                    name: tournament.name,
                    success: true,
                    ...result
                });
            } catch (e) {
                console.error(`  ✗ FAILED: ${e.message}`);
                console.error(`  Stack: ${e.stack}`);
                results.push({
                    slug: tournament.slug,
                    name: tournament.name,
                    success: false,
                    error: e.message
                });
            }
        }
        
        console.log('\n========================================');
        console.log('SYNC COMPLETE');
        console.log(`  Total: ${tournaments.length}`);
        console.log(`  Success: ${results.filter(r => r.success).length}`);
        console.log(`  Failed: ${results.filter(r => !r.success).length}`);
        console.log('========================================\n');
        
        res.status(200).json({
            totalFound: tournaments.length,
            synced: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            results
        });
    } catch (error) {
        console.error('========================================');
        console.error('SYNC FAILED WITH ERROR:');
        console.error(error.message);
        console.error(error.stack);
        console.error('========================================');
        res.status(500).json({ error: error.message || 'Failed to sync IFL tournaments' });
    }
});

// Get tournament information
app.get('/api/startgg/tournament/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await startgg.getTournamentBySlug(slug);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tournament:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch tournament' });
    }
});

// Get tournament events and matches
app.get('/api/startgg/tournament/:slug/events', async (req, res) => {
    try {
        const { slug } = req.params;
        const { eventSlug } = req.query;
        const data = await startgg.getTournamentEvents(slug, eventSlug || null);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tournament events:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch tournament events' });
    }
});

// Get all matches (sets) for a tournament
app.get('/api/startgg/tournament/:slug/matches', async (req, res) => {
    try {
        const { slug } = req.params;
        const { eventSlug } = req.query;
        const matches = await startgg.getAllTournamentSets(slug, eventSlug || null);
        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch matches' });
    }
});

// Get tournament participants
app.get('/api/startgg/tournament/:slug/participants', async (req, res) => {
    try {
        const { slug } = req.params;
        const { eventSlug } = req.query;
        const data = await startgg.getTournamentParticipants(slug, eventSlug || null);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch participants' });
    }
});

// Get player information
app.get('/api/startgg/player/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await startgg.getPlayerInfo(slug);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch player' });
    }
});

// Sync tournament from start.gg to database
app.post('/api/startgg/sync/tournament/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { eventSlug } = req.body;
        const result = await startggSync.syncTournamentFromStartGG(slug, eventSlug || null);
        res.status(200).json({
            success: true,
            message: 'Tournament synced successfully',
            ...result
        });
    } catch (error) {
        console.error('Error syncing tournament:', error);
        res.status(500).json({ error: error.message || 'Failed to sync tournament' });
    }
});

// Sync player from start.gg to database
app.post('/api/startgg/sync/player/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const userId = await startggSync.syncPlayerFromStartGG(slug);
        res.status(200).json({
            success: true,
            message: 'Player synced successfully',
            userId
        });
    } catch (error) {
        console.error('Error syncing player:', error);
        res.status(500).json({ error: error.message || 'Failed to sync player' });
    }
});

// Get match history for a player from database
app.get('/api/startgg/player/:playerId/matches', async (req, res) => {
    try {
        const { playerId } = req.params;
        const pool = require('./db');
        const [matches] = await pool.execute(
            `SELECT m.*, 
                    p1.username as p1Name, p1.country as p1Flag,
                    p2.username as p2Name, p2.country as p2Flag,
                    t.name as tournamentName, t.start_date
             FROM matches m
             LEFT JOIN users p1 ON m.player1_id = p1.user_id
             LEFT JOIN users p2 ON m.player2_id = p2.user_id
             LEFT JOIN tournaments t ON m.tournament_id = t.tournament_id
             WHERE m.player1_id = ? OR m.player2_id = ?
             ORDER BY m.match_time DESC
             LIMIT 100`,
            [playerId, playerId]
        );
        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching player matches:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch player matches' });
    }
});

// Get all tournaments from DATABASE (use /api/db/ prefix)
app.get('/api/db/tournaments', async (req, res) => {
    try {
        const pool = require('./db');
        const [tournaments] = await pool.execute(
            'SELECT * FROM tournaments ORDER BY start_date DESC'
        );
        res.status(200).json({ tournaments });
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch tournaments' });
    }
});

// Get tournament stats with participant counts for charts - fetches from start.gg for accurate attendee counts
app.get('/api/db/tournaments/stats', async (req, res) => {
    try {
        const startgg = require('./startgg');
        const pool = require('./db');
        
        // Fetch IFL tournaments from start.gg for accurate numAttendees
        const iflTournaments = await startgg.searchIronFistLeagueTournaments(15);
        
        // Sort by date and format for the chart
        const stats = iflTournaments
            .sort((a, b) => (a.startAt || 0) - (b.startAt || 0))
            .map(t => {
                // Extract IFL number from name or slug if possible
                const iflMatch = t.name.match(/(?:Iron Fist League|IFL)\s*#?(\d+)/i) || 
                                 t.slug.match(/iron-fist-league-(\d+)/i);
                const iflNumber = iflMatch ? parseInt(iflMatch[1]) : null;
                
                return {
                    tournament_id: t.id,
                    name: t.name,
                    start_date: t.startAt ? new Date(t.startAt * 1000).toISOString() : null,
                    status: 'completed',
                    participant_count: t.numAttendees || 0,
                    match_count: 0, // Will be enriched from DB if needed
                    ifl_number: iflNumber
                };
            });
        
        // Optionally enrich with match counts from local DB
        const enrichedStats = await Promise.all(stats.map(async (tournament) => {
            try {
                // Try to find matching tournament in local DB by name
                const [dbMatches] = await pool.execute(
                    `SELECT COUNT(*) as match_count FROM matches m 
                     JOIN tournaments t ON m.tournament_id = t.tournament_id 
                     WHERE t.name LIKE ?`,
                    [`%${tournament.name.substring(0, 30)}%`]
                );
                return {
                    ...tournament,
                    match_count: dbMatches[0]?.match_count || 0
                };
            } catch {
                return tournament;
            }
        }));
        
        res.status(200).json({ stats: enrichedStats });
    } catch (error) {
        console.error('Error fetching tournament stats:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch tournament stats' });
    }
});

// Get league standings from start.gg API
app.get('/api/db/league/standings', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const startgg = require('./startgg');
        
        // Fetch standings directly from start.gg league API
        const standings = await startgg.getLeagueStandings('iron-fist-league', limit);
        
        // Map country names to 2-letter codes for flag display
        const countryCodeMap = {
            'france': 'fr', 'germany': 'de', 'united states': 'us', 'united kingdom': 'gb',
            'spain': 'es', 'italy': 'it', 'japan': 'jp', 'south korea': 'kr', 'china': 'cn',
            'canada': 'ca', 'australia': 'au', 'brazil': 'br', 'mexico': 'mx', 'netherlands': 'nl',
            'belgium': 'be', 'sweden': 'se', 'poland': 'pl', 'portugal': 'pt', 'switzerland': 'ch',
            'austria': 'at', 'denmark': 'dk', 'norway': 'no', 'finland': 'fi', 'ireland': 'ie',
            'russia': 'ru', 'turkey': 'tr', 'greece': 'gr', 'czech republic': 'cz', 'romania': 'ro',
            'hungary': 'hu', 'slovakia': 'sk', 'croatia': 'hr', 'slovenia': 'si', 'bulgaria': 'bg',
            'estonia': 'ee', 'latvia': 'lv', 'lithuania': 'lt', 'malta': 'mt', 'saudi arabia': 'sa',
            'uae': 'ae', 'israel': 'il', 'south africa': 'za', 'egypt': 'eg', 'morocco': 'ma',
            'tunisia': 'tn', 'algeria': 'dz', 'nigeria': 'ng', 'kenya': 'ke', 'pakistan': 'pk',
            'india': 'in', 'singapore': 'sg', 'malaysia': 'my', 'philippines': 'ph', 'indonesia': 'id',
            'thailand': 'th', 'vietnam': 'vn', 'taiwan': 'tw', 'hong kong': 'hk', 'new zealand': 'nz',
            'argentina': 'ar', 'chile': 'cl', 'colombia': 'co', 'peru': 'pe', 'venezuela': 've',
            'puerto rico': 'pr'
        };
        
        const formattedStandings = standings.map(player => {
            // Convert country name to code if needed
            let countryCode = player.country;
            if (player.country && player.country.length > 2) {
                countryCode = countryCodeMap[player.country.toLowerCase()] || null;
            }
            
            return {
                rank: player.rank,
                user_id: player.playerId,
                username: player.username,
                sponsor: player.sponsor,
                country: countryCode,
                wins: 0, // Not provided by standings API
                losses: 0,
                total_matches: 0,
                tournaments_played: 0,
                points: player.points
            };
        });
        
        res.status(200).json({ standings: formattedStandings });
    } catch (error) {
        console.error('Error fetching league standings:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch league standings' });
    }
});

// Get matches for a tournament from DATABASE (use /api/db/tournament/... to distinguish from start.gg API)
app.get('/api/db/tournament/:tournamentId/matches', async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const pool = require('./db');
        
        console.log(`[DB] Fetching matches for tournament_id: ${tournamentId}`);
        
        const [matches] = await pool.execute(
            `SELECT m.match_id, m.tournament_id, m.player1_id, m.player2_id, 
                    m.winner_id, m.round_name, m.score_p1, m.score_p2, m.match_time,
                    p1.username as p1Name, p1.country as p1Flag,
                    p2.username as p2Name, p2.country as p2Flag
             FROM matches m
             LEFT JOIN users p1 ON m.player1_id = p1.user_id
             LEFT JOIN users p2 ON m.player2_id = p2.user_id
             WHERE m.tournament_id = ?
             ORDER BY m.match_time DESC`,
            [tournamentId]
        );
        
        console.log(`[DB] Found ${matches.length} matches for tournament ${tournamentId}`);
        if (matches.length > 0) {
            console.log(`[DB] First match: ${matches[0].p1Name} vs ${matches[0].p2Name}`);
        }
        
        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching tournament matches:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch tournament matches' });
    }
});

// Debug endpoint to check database state
app.get('/api/debug/db-check', async (req, res) => {
    try {
        const pool = require('./db');
        
        // Get table structures
        const [usersColumns] = await pool.execute('DESCRIBE users');
        const [matchesColumns] = await pool.execute('DESCRIBE matches');
        
        // Check tables
        const [users] = await pool.execute('SELECT COUNT(*) as count FROM users');
        const [matches] = await pool.execute('SELECT COUNT(*) as count FROM matches');
        const [tournaments] = await pool.execute('SELECT COUNT(*) as count FROM tournaments');
        
        // Get sample data
        const [sampleUsers] = await pool.execute('SELECT * FROM users LIMIT 5');
        const [sampleMatches] = await pool.execute('SELECT * FROM matches LIMIT 5');
        
        // Test the JOIN query
        const [joinTest] = await pool.execute(`
            SELECT m.*, p1.username as p1Name, p2.username as p2Name
            FROM matches m
            LEFT JOIN users p1 ON m.player1_id = p1.user_id
            LEFT JOIN users p2 ON m.player2_id = p2.user_id
            LIMIT 3
        `);
        
        res.json({
            tableStructures: {
                users: usersColumns.map(c => ({ field: c.Field, type: c.Type })),
                matches: matchesColumns.map(c => ({ field: c.Field, type: c.Type }))
            },
            counts: {
                users: users[0].count,
                matches: matches[0].count,
                tournaments: tournaments[0].count
            },
            sampleUsers,
            sampleMatches,
            joinTest
        });
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

// Get all players from database
app.get('/api/startgg/players', async (req, res) => {
    try {
        const pool = require('./db');
        const [players] = await pool.execute(
            `SELECT u.*, 
                    COUNT(DISTINCT m.match_id) as total_matches,
                    SUM(CASE WHEN m.winner_id = u.user_id THEN 1 ELSE 0 END) as wins
             FROM users u
             LEFT JOIN matches m ON u.user_id = m.player1_id OR u.user_id = m.player2_id
             GROUP BY u.user_id
             ORDER BY total_matches DESC, u.username ASC`
        );
        res.status(200).json({ players });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch players' });
    }
});

// Update player info
app.put('/api/db/player/:playerId', async (req, res) => {
    try {
        const { playerId } = req.params;
        const { username, sponsor, country, main_character } = req.body;
        const pool = require('./db');
        
        // Build dynamic update query based on provided fields
        const updates = [];
        const values = [];
        
        if (username !== undefined) {
            updates.push('username = ?');
            values.push(username);
        }
        if (sponsor !== undefined) {
            updates.push('sponsor = ?');
            values.push(sponsor || null);
        }
        if (country !== undefined) {
            updates.push('country = ?');
            values.push(country || null);
        }
        if (main_character !== undefined) {
            updates.push('main_character = ?');
            values.push(main_character || null);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }
        
        values.push(playerId);
        
        await pool.execute(
            `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`,
            values
        );
        
        // Return updated player
        const [players] = await pool.execute(
            `SELECT u.*, 
                    COUNT(DISTINCT m.match_id) as total_matches,
                    SUM(CASE WHEN m.winner_id = u.user_id THEN 1 ELSE 0 END) as wins
             FROM users u
             LEFT JOIN matches m ON u.user_id = m.player1_id OR u.user_id = m.player2_id
             WHERE u.user_id = ?
             GROUP BY u.user_id`,
            [playerId]
        );
        
        // Broadcast updated player history to all connected overlay controllers
        try {
            const updatedHistory = await dbHelpers.loadPlayerHistory();
            playerHistory = updatedHistory; // Update cached history
            io.emit('history-update', updatedHistory);
            console.log(`[Player Update] Player ${playerId} updated, broadcasted to ${io.engine.clientsCount} clients`);
        } catch (historyError) {
            console.error('Error broadcasting player history:', historyError);
        }
        
        res.status(200).json({ success: true, player: players[0] });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ error: error.message || 'Failed to update player' });
    }
});

// Cleanup player names - extract sponsors from "Sponsor | PlayerName" format and merge duplicates
app.post('/api/db/players/cleanup', async (req, res) => {
    try {
        const pool = require('./db');
        
        // Find all players with " | " in their username (old format)
        const [playersToFix] = await pool.execute(
            "SELECT user_id, username, sponsor, country FROM users WHERE username LIKE '% | %'"
        );
        
        let fixed = 0;
        let merged = 0;
        
        for (const player of playersToFix) {
            const parts = player.username.split(' | ');
            if (parts.length >= 2) {
                const extractedSponsor = parts[0];
                const actualName = parts.slice(1).join(' | '); // Handle cases like "A | B | C"
                
                // Check if a player with the clean name already exists
                const [existingPlayers] = await pool.execute(
                    'SELECT user_id, sponsor, country FROM users WHERE username = ? AND user_id != ?',
                    [actualName, player.user_id]
                );
                
                if (existingPlayers.length > 0) {
                    // Duplicate exists! Merge by updating match references and deleting the old format player
                    const keepPlayer = existingPlayers[0];
                    const deletePlayerId = player.user_id;
                    const keepPlayerId = keepPlayer.user_id;
                    
                    // Update all match references from old player to the kept player
                    await pool.execute(
                        'UPDATE matches SET player1_id = ? WHERE player1_id = ?',
                        [keepPlayerId, deletePlayerId]
                    );
                    await pool.execute(
                        'UPDATE matches SET player2_id = ? WHERE player2_id = ?',
                        [keepPlayerId, deletePlayerId]
                    );
                    await pool.execute(
                        'UPDATE matches SET winner_id = ? WHERE winner_id = ?',
                        [keepPlayerId, deletePlayerId]
                    );
                    
                    // Update the kept player with sponsor/country if they don't have it
                    const newSponsor = keepPlayer.sponsor || extractedSponsor;
                    const newCountry = keepPlayer.country || player.country;
                    await pool.execute(
                        'UPDATE users SET sponsor = ?, country = ? WHERE user_id = ?',
                        [newSponsor, newCountry, keepPlayerId]
                    );
                    
                    // Delete the duplicate (old format) player
                    await pool.execute('DELETE FROM users WHERE user_id = ?', [deletePlayerId]);
                    
                    merged++;
                    console.log(`[Cleanup] Merged: "${player.username}" (id:${deletePlayerId}) -> "${actualName}" (id:${keepPlayerId})`);
                } else {
                    // No duplicate - just fix the name format
                    await pool.execute(
                        'UPDATE users SET username = ?, sponsor = ? WHERE user_id = ?',
                        [actualName, extractedSponsor, player.user_id]
                    );
                    fixed++;
                    console.log(`[Cleanup] Fixed: "${player.username}" -> username: "${actualName}", sponsor: "${extractedSponsor}"`);
                }
            }
        }
        
        // Broadcast updated player history
        const updatedHistory = await dbHelpers.loadPlayerHistory();
        playerHistory = updatedHistory;
        io.emit('history-update', updatedHistory);
        
        const message = `Fixed ${fixed} player names, merged ${merged} duplicates`;
        res.status(200).json({ 
            success: true, 
            message,
            fixed,
            merged
        });
    } catch (error) {
        console.error('Error cleaning up player names:', error);
        res.status(500).json({ error: error.message || 'Failed to cleanup player names' });
    }
});

// Get player match history from database
app.get('/api/startgg/player/:playerId/matches', async (req, res) => {
    try {
        const { playerId } = req.params;
        const pool = require('./db');
        const [matches] = await pool.execute(
            `SELECT m.*, 
                    p1.username as p1Name, p1.country as p1Flag,
                    p2.username as p2Name, p2.country as p2Flag,
                    t.name as tournamentName
             FROM matches m
             LEFT JOIN users p1 ON m.player1_id = p1.user_id
             LEFT JOIN users p2 ON m.player2_id = p2.user_id
             LEFT JOIN tournaments t ON m.tournament_id = t.tournament_id
             WHERE m.player1_id = ? OR m.player2_id = ?
             ORDER BY m.match_time DESC`,
            [playerId, playerId]
        );
        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching player matches:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch player matches' });
    }
});


// --- SOCKET.IO ---

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === CONNECTION_KEY) next();
  else next(new Error('Invalid connection key'));
});

io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);

  // Send current state immediately on connection
  // Load fresh data from database
  try {
    const currentOverlayData = await dbHelpers.loadIFLData();
    const currentTagTeamData = await dbHelpers.loadTagTeamData();
    const currentRibMatchCards = await dbHelpers.loadRIBMatchCards();
    const currentRibPlayerStats = await dbHelpers.loadRIBPlayerStats();
    const currentRibStreamData = await dbHelpers.loadRIBStreamData();
    
    socket.emit('data-update', currentOverlayData);
    socket.emit('tag-team-data', currentTagTeamData);
    socket.emit('rib-match-cards-update', currentRibMatchCards);
    socket.emit('rib-player-stats-update', currentRibPlayerStats);
    socket.emit('rib-stream-data-update', currentRibStreamData);
    socket.emit('rib-overlay-state-update', ribOverlayState);
  } catch (error) {
    console.error('Error loading initial data for socket:', error);
    // Send cached data as fallback
    socket.emit('data-update', overlayData);
    socket.emit('tag-team-data', tagTeamData);
    socket.emit('rib-match-cards-update', ribMatchCards);
    socket.emit('rib-player-stats-update', ribPlayerStats);
    socket.emit('rib-stream-data-update', ribStreamData);
    socket.emit('rib-overlay-state-update', ribOverlayState);
  }

  // Handle 1v1 Updates
  socket.on('update-data', async (data) => {
    try {
      overlayData = data;
      await dbHelpers.saveIFLData(overlayData);

      // Also update player history from socket updates
      const playersToSave = [
          { name: data.p1Name, team: data.p1Team, flag: data.p1Flag },
          { name: data.p2Name, team: data.p2Team, flag: data.p2Flag },
      ].filter(p => p.name); // Only save players with names

      if (playersToSave.length > 0) {
          await dbHelpers.savePlayerHistory(playersToSave);
          const updatedHistory = await dbHelpers.loadPlayerHistory();
          // Inform all clients about the history update
          io.emit('history-update', updatedHistory);
      }

      io.emit('data-update', overlayData);
    } catch (error) {
      console.error('Error handling update-data:', error);
    }
  });

  // Handle Tag Team Updates
  socket.on('tag-team-update', async (data) => {
    try {
      console.log('Received Tag Team Update');
      tagTeamData = data;
      await dbHelpers.saveTagTeamData(tagTeamData);
      io.emit('tag-team-data', tagTeamData);
    } catch (error) {
      console.error('Error handling tag-team-update:', error);
    }
  });

  // Handle Run It Back Updates
  socket.on('rib-match-cards-update', async (data) => {
    try {
      console.log('Received RIB Match Cards Update');
      ribMatchCards = data;
      await dbHelpers.saveRIBMatchCards(ribMatchCards);
      io.emit('rib-match-cards-update', ribMatchCards);
    } catch (error) {
      console.error('Error handling rib-match-cards-update:', error);
    }
  });

  socket.on('rib-player-stats-update', async (data) => {
    try {
      console.log('Received RIB Player Stats Update');
      ribPlayerStats = data;
      await dbHelpers.saveRIBPlayerStats(ribPlayerStats);
      io.emit('rib-player-stats-update', ribPlayerStats);
    } catch (error) {
      console.error('Error handling rib-player-stats-update:', error);
    }
  });

  socket.on('rib-stream-data-update', async (data) => {
    try {
      console.log('Received RIB Stream Data Update');
      ribStreamData = data;
      await dbHelpers.saveRIBStreamData(ribStreamData);
      io.emit('rib-stream-data-update', ribStreamData);
    } catch (error) {
      console.error('Error handling rib-stream-data-update:', error);
    }
  });

  socket.on('rib-overlay-state-update', (data) => {
    console.log('Received RIB Overlay State Update');
    ribOverlayState = { ...ribOverlayState, ...data };
    io.emit('rib-overlay-state-update', ribOverlayState);
  });
});

// Catch-all to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


server.listen(port, () => {
  console.log(`\nServer running at http://localhost:${port}`);
  console.log(`Login with key: ${CONNECTION_KEY}`);
});