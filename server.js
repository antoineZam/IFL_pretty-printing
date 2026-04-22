require('dotenv').config();
const express = require('express');
const http    = require('http');
const socketIo = require('socket.io');
const fs   = require('fs');
const path = require('path');
const pool       = require('./db');
const dbHelpers  = require('./dbHelpers');
const startggSync = require('./startggSync');
const startgg    = require('./startgg');

// ============================================================
// CONFIGURATION
// ============================================================

const CONNECTION_KEY = process.env.CONNECTION_KEY;
const IFF_ACCESS_KEY = process.env.IFF_ACCESS_KEY;

if (!CONNECTION_KEY) {
    console.error('FATAL: CONNECTION_KEY is not defined in your .env file.');
    console.error('Add CONNECTION_KEY=your_secret_key_here to .env and restart.');
    process.exit(1);
}
if (!IFF_ACCESS_KEY) {
    console.warn('WARNING: IFF_ACCESS_KEY not defined — Run It Back accessible without extra auth.');
}
if (process.env.STARTGG_API_KEY) {
    console.log('start.gg API key loaded.');
} else {
    console.warn('WARNING: STARTGG_API_KEY not defined — start.gg integration disabled.');
}
console.log('Connection key loaded. Navigate to /auth to sign in.');

// ============================================================
// APP SETUP
// ============================================================

const port   = 3000;
const app    = express();
const server = http.createServer(app);
const io     = socketIo(server);

app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use('/source', express.static(path.join(__dirname, 'client', 'public', 'source')));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const SOURCE_DIR = path.join(__dirname, 'client', 'public', 'source');
if (!fs.existsSync(SOURCE_DIR)) fs.mkdirSync(SOURCE_DIR, { recursive: true });

// ============================================================
// IN-MEMORY STATE
// All broadcast state lives here; every write handler keeps it
// in sync so sockets can serve from cache without DB round-trips.
// ============================================================

let overlayData    = null;
let tagTeamData    = null;
let playerHistory  = [];
let ribMatchCards  = null;
let ribPlayerStats = null;
let ribStreamData  = null;

let ribOverlayState = {
    showMatchCard: false, showPlayerStats: false, showPartOne: false,
    showStreamOverlay: false, selectedMatchIndex: 0, selectedPlayerIndex: 0, animationTrigger: 0,
};
let loveAndWarDisplayState = { teamId: null, visible: false };
let lnwDisplayMode  = { mode: 'idle', teamId: null, visible: false };
let lnwMatchData = {
    team1: { name: 'Team 1', players: [{ name: 'Player 1', active: true }, { name: 'Player 2', active: false }], score: 0 },
    team2: { name: 'Team 2', players: [{ name: 'Player 1', active: true }, { name: 'Player 2', active: false }], score: 0 },
    round: 'Round 1',
};

// ============================================================
// DATA INITIALIZATION
// All DB reads run in parallel; server only starts listening
// after the cache is fully populated.
// ============================================================

async function initializeData() {
    try {
        [
            overlayData, tagTeamData, playerHistory,
            ribMatchCards, ribPlayerStats, ribStreamData,
        ] = await Promise.all([
            dbHelpers.loadIFLData(),        dbHelpers.loadTagTeamData(),
            dbHelpers.loadPlayerHistory(),  dbHelpers.loadRIBMatchCards(),
            dbHelpers.loadRIBPlayerStats(), dbHelpers.loadRIBStreamData(),
        ]);
        console.log('Data loaded from database successfully.');
    } catch (err) {
        console.error('Error initializing data from database:', err);
        overlayData = {
            p1Flag: 'fr', p1Team: 'Team 1', p1Name: 'Player 1', p1Rank: null,
            p2Flag: 'rn', p2Team: 'Team 2', p2Name: 'Player 2', p2Rank: null,
            p1Score: 0, p2Score: 0, round: 'Winners Round 1', eventNumber: '1',
        };
        tagTeamData = {
            team1: { name: 'Team 1', tag: 'T1', players: [], score: 0 },
            team2: { name: 'Team 2', tag: 'T2', players: [], score: 0 },
            round: 'Winners Round 1',
        };
        playerHistory  = [];
        ribMatchCards  = {
            eventTitle: 'THE RUNBACK', eventSubtitle: 'THE FINAL CHAPTER', partNumber: '01',
            mainEvent: { p1Name: '', p1Title: '', p1Character: '', p2Name: '', p2Title: '', p2Character: '' },
            matches: [],
            singleMatch: { matchTitle: '', format: '', p1Name: '', p1Title: '', p1Character: '', p2Name: '', p2Title: '', p2Character: '' },
            sponsors: { presenter: '', association: '' },
        };
        ribPlayerStats = { players: [] };
        ribStreamData  = { matchTitle: '', p1Name: '', p1Flag: '', p1Score: 0, p2Name: '', p2Flag: '', p2Score: 0 };
    }
}

initializeData()
    .then(() => server.listen(port, () => console.log(`Server running at http://localhost:${port}`)))
    .catch(err => { console.error('Fatal: could not initialize data:', err); process.exit(1); });

// ============================================================
// UTILITIES
// ============================================================

/**
 * Wraps an async route handler.
 * Catches any thrown error and responds with 500 + message,
 * eliminating the try/catch boilerplate from every route.
 */
const asyncRoute = fn => async (req, res) => {
    try {
        await fn(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

/**
 * Merges a patch into a state object, updating only the keys
 * already present in `current`. Extra keys in `patch` are silently
 * dropped, preventing clients from injecting arbitrary state.
 * A patch value of `undefined` is treated as "no change".
 */
function patchState(current, patch) {
    const result = {};
    for (const key of Object.keys(current)) {
        result[key] = (patch != null && patch[key] !== undefined) ? patch[key] : current[key];
    }
    return result;
}

/**
 * Returns a new object containing only the specified keys from `obj`.
 * Used to validate and whitelist request body fields before passing
 * them to database helpers.
 */
function pickFields(obj, keys) {
    return Object.fromEntries(keys.map(k => [k, obj[k]]));
}

// Whitelist of fields accepted for IFF player create/update.
// Mirrors the columns of the iff_players table.
const IFF_PLAYER_FIELDS = [
    'name', 'polaris_id', 'character_name', 'division', 'rank_name', 'tekken_power',
    'prowess', 'iff8_ranking', 'iff8_record', 'iff8_record_details', 'iff_history',
    'ranked_wins', 'ranked_losses', 'ranked_wl_rate', 'player_wins', 'player_losses',
    'player_wl_rate', 'offense_rating', 'defense_rating', 'consistency_rating',
    'adaptability_rating', 'clutch_rating', 'experience_rating',
];

// ============================================================
// AUTH MIDDLEWARE
// ============================================================

function requireAuth(req, res, next) {
    if (req.headers['x-connection-key'] === CONNECTION_KEY) return next();
    return res.status(401).json({ error: 'Unauthorized' });
}

// Applied on top of requireAuth for /api/rib/* and /api/iff/* routes.
// When IFF_ACCESS_KEY is not configured the check is skipped (open access).
function requireRibAuth(req, res, next) {
    if (!IFF_ACCESS_KEY) return next();
    if (req.headers['x-iff-key'] === IFF_ACCESS_KEY) return next();
    return res.status(403).json({ error: 'Forbidden' });
}

// Public auth endpoints — must be registered before the requireAuth middleware.
app.post('/api/auth', (req, res) => {
    if (req.body.key === CONNECTION_KEY) return res.json({ success: true });
    res.status(401).json({ success: false, message: 'Invalid connection key' });
});

app.post('/api/rib-auth', (req, res) => {
    if (!IFF_ACCESS_KEY) return res.json({ success: true, message: 'No RIB key required' });
    if (req.body.key === IFF_ACCESS_KEY) return res.json({ success: true });
    res.status(401).json({ success: false, message: 'Invalid RIB access key' });
});

app.get('/api/rib-auth/required', (req, res) => res.json({ required: !!IFF_ACCESS_KEY }));

// All /api/* routes below this point require the master key.
app.use('/api', requireAuth);

// ============================================================
// HISTORY ROUTES  —  /api/history
// ============================================================

const historyRouter = express.Router();

historyRouter.get('/', asyncRoute(async (req, res) => {
    res.json(await dbHelpers.loadPlayerHistory());
}));

historyRouter.post('/', asyncRoute(async (req, res) => {
    await dbHelpers.savePlayerHistory(req.body);
    res.json(await dbHelpers.loadPlayerHistory());
}));

historyRouter.delete('/', asyncRoute(async (req, res) => {
    const { name } = req.body;
    const [result] = await pool.execute('DELETE FROM users WHERE username = ?', [name]);
    if (result.affectedRows > 0) return res.json({ success: true, message: 'Player deleted.' });
    res.status(404).json({ success: false, message: 'Player not found.' });
}));

app.use('/api/history', historyRouter);

// ============================================================
// RUN IT BACK ROUTES  —  /api/rib
// ============================================================

const ribRouter = express.Router();

ribRouter.get('/match-cards', asyncRoute(async (req, res) => {
    res.json(await dbHelpers.loadRIBMatchCards());
}));
ribRouter.post('/match-cards', asyncRoute(async (req, res) => {
    ribMatchCards = req.body;
    await dbHelpers.saveRIBMatchCards(ribMatchCards);
    io.emit('rib-match-cards-update', ribMatchCards);
    res.json(ribMatchCards);
}));

ribRouter.get('/player-stats', asyncRoute(async (req, res) => {
    res.json(await dbHelpers.loadRIBPlayerStats());
}));
ribRouter.post('/player-stats', asyncRoute(async (req, res) => {
    ribPlayerStats = req.body;
    await dbHelpers.saveRIBPlayerStats(ribPlayerStats);
    io.emit('rib-player-stats-update', ribPlayerStats);
    res.json(ribPlayerStats);
}));

ribRouter.get('/stream-data', asyncRoute(async (req, res) => {
    res.json(await dbHelpers.loadRIBStreamData());
}));
ribRouter.post('/stream-data', asyncRoute(async (req, res) => {
    ribStreamData = req.body;
    await dbHelpers.saveRIBStreamData(ribStreamData);
    io.emit('rib-stream-data-update', ribStreamData);
    res.json(ribStreamData);
}));

ribRouter.get('/overlay-state', (req, res) => res.json(ribOverlayState));
ribRouter.post('/overlay-state', (req, res) => {
    ribOverlayState = patchState(ribOverlayState, req.body);
    io.emit('rib-overlay-state-update', ribOverlayState);
    res.json(ribOverlayState);
});

app.use('/api/rib', requireRibAuth, ribRouter);

// ============================================================
// START.GG ROUTES  —  /api/startgg
// ============================================================

const startggRouter = express.Router();

startggRouter.get('/search', asyncRoute(async (req, res) => {
    const { term } = req.query;
    if (!term) return res.status(400).json({ error: 'Search term is required' });
    res.json(await startggSync.findTournamentsByTerm(term));
}));

startggRouter.get('/ifl/tournaments', asyncRoute(async (req, res) => {
    res.json(await startgg.searchIronFistLeagueTournaments(50));
}));

startggRouter.post('/ifl/sync-all', asyncRoute(async (req, res) => {
    const tournaments = await startgg.searchIronFistLeagueTournaments(50);
    console.log(`[Sync] sync-all starting: ${tournaments.length} tournaments found.`);
    const results = [];
    for (const t of tournaments) {
        try {
            const r = await startggSync.syncTournamentFromStartGG(t.slug);
            console.log(`[Sync] ✓ ${t.name}`);
            results.push({ slug: t.slug, name: t.name, success: true, ...r });
        } catch (e) {
            console.error(`[Sync] ✗ ${t.name}: ${e.message}`);
            results.push({ slug: t.slug, name: t.name, success: false, error: e.message });
        }
    }
    const synced = results.filter(r => r.success).length;
    console.log(`[Sync] sync-all complete: ${synced}/${tournaments.length} succeeded.`);
    res.json({ totalFound: tournaments.length, synced, failed: tournaments.length - synced, results });
}));

startggRouter.get('/ifl/:number', asyncRoute(async (req, res) => {
    const data = await startgg.getIFLTournamentByNumber(req.params.number, req.query.suffix || '');
    if (!data) return res.status(404).json({ error: 'Tournament not found' });
    res.json(data);
}));

startggRouter.get('/tournament/:slug', asyncRoute(async (req, res) => {
    res.json(await startgg.getTournamentBySlug(req.params.slug));
}));

startggRouter.get('/tournament/:slug/events', asyncRoute(async (req, res) => {
    res.json(await startgg.getTournamentEvents(req.params.slug, req.query.eventSlug || null));
}));

startggRouter.get('/tournament/:slug/matches', asyncRoute(async (req, res) => {
    res.json({ matches: await startgg.getAllTournamentSets(req.params.slug, req.query.eventSlug || null) });
}));

startggRouter.get('/tournament/:slug/participants', asyncRoute(async (req, res) => {
    res.json(await startgg.getTournamentParticipants(req.params.slug, req.query.eventSlug || null));
}));

startggRouter.get('/event/:eventSlug/standings', asyncRoute(async (req, res) => {
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 8, 1), 64);
    const raw = await startgg.getEventStandings(req.params.eventSlug, limit);
    res.json({
        standings: raw.map(p => ({
            placement: p.placement, entrant_id: p.entrantId,
            username: p.username, sponsor: p.sponsor, country: p.country,
        })),
    });
}));

startggRouter.get('/event/:eventSlug/bracket', asyncRoute(async (req, res) => {
    const page    = Math.max(parseInt(req.query.page)    || 1,  1);
    const perPage = Math.min(Math.max(parseInt(req.query.perPage) || 25, 1), 30);
    const bracket = await startgg.getEventBracket(req.params.eventSlug, page, perPage);
    if (!bracket) return res.status(404).json({ error: 'Event not found or no bracket data' });
    res.json(bracket);
}));

startggRouter.get('/league/:slug/tournaments', asyncRoute(async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    res.json({ tournaments: await startgg.getLeagueTournaments(req.params.slug, limit) });
}));

startggRouter.get('/player/:slug', asyncRoute(async (req, res) => {
    res.json(await startgg.getPlayerInfo(req.params.slug));
}));

startggRouter.post('/sync/tournament/:slug', asyncRoute(async (req, res) => {
    const { slug } = req.params;
    console.log(`[Sync] Starting tournament sync: ${slug}`);
    const result = await startggSync.syncTournamentFromStartGG(slug, req.body.eventSlug || null);
    res.json({ success: true, message: 'Tournament synced successfully', ...result });
}));

startggRouter.post('/sync/player/:slug', asyncRoute(async (req, res) => {
    const userId = await startggSync.syncPlayerFromStartGG(req.params.slug);
    res.json({ success: true, message: 'Player synced successfully', userId });
}));

startggRouter.get('/player/:playerId/matches', asyncRoute(async (req, res) => {
    const { playerId } = req.params;
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
         ORDER BY m.match_time DESC LIMIT 100`,
        [playerId, playerId]
    );
    res.json({ matches });
}));

startggRouter.get('/players', asyncRoute(async (req, res) => {
    const [players] = await pool.execute(
        `SELECT u.*,
                COUNT(DISTINCT m.match_id) as total_matches,
                SUM(CASE WHEN m.winner_id = u.user_id THEN 1 ELSE 0 END) as wins
         FROM users u
         LEFT JOIN matches m ON u.user_id = m.player1_id OR u.user_id = m.player2_id
         GROUP BY u.user_id ORDER BY total_matches DESC, u.username ASC`
    );
    res.json({ players });
}));

app.use('/api/startgg', startggRouter);

// ============================================================
// DATABASE ROUTES  —  /api/db
// ============================================================

const dbRouter = express.Router();

dbRouter.get('/tournaments', asyncRoute(async (req, res) => {
    const [tournaments] = await pool.execute('SELECT * FROM tournaments ORDER BY start_date DESC');
    res.json({ tournaments });
}));

dbRouter.get('/tournaments/stats', asyncRoute(async (req, res) => {
    const stats = await startgg.getLeagueTournamentStats(startgg.IFL_LEAGUE_SLUG, 20);
    res.json({ stats });
}));

dbRouter.get('/league/standings', asyncRoute(async (req, res) => {
    const limit = parseInt(req.query.limit) || 8;
    const raw = await startgg.getLeagueStandings(startgg.IFL_LEAGUE_SLUG, limit);
    res.json({
        standings: raw.map(p => ({
            rank: p.rank, user_id: p.playerId, username: p.username,
            sponsor: p.sponsor, country: p.country,
            wins: 0, losses: 0, total_matches: 0, tournaments_played: 0, points: p.points,
        })),
    });
}));

dbRouter.get('/tournament/:tournamentId/matches', asyncRoute(async (req, res) => {
    const [matches] = await pool.execute(
        `SELECT m.match_id, m.tournament_id, m.player1_id, m.player2_id,
                m.winner_id, m.round_name, m.score_p1, m.score_p2, m.match_time,
                p1.username as p1Name, p1.country as p1Flag,
                p2.username as p2Name, p2.country as p2Flag
         FROM matches m
         LEFT JOIN users p1 ON m.player1_id = p1.user_id
         LEFT JOIN users p2 ON m.player2_id = p2.user_id
         WHERE m.tournament_id = ? ORDER BY m.match_time DESC`,
        [req.params.tournamentId]
    );
    res.json({ matches });
}));

dbRouter.get('/tournament/:tournamentId/standings', asyncRoute(async (req, res) => {
    const { tournamentId } = req.params;
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 8, 1), 64);
    const [rows] = await pool.execute(`
        SELECT u.user_id, u.username, u.sponsor, u.country,
               SUM(CASE WHEN m.winner_id = u.user_id THEN 1 ELSE 0 END) as wins,
               SUM(CASE WHEN m.winner_id IS NOT NULL AND m.winner_id != u.user_id THEN 1 ELSE 0 END) as losses,
               COUNT(*) as total_matches
        FROM users u
        JOIN matches m ON (m.player1_id = u.user_id OR m.player2_id = u.user_id)
        WHERE m.tournament_id = ?
        GROUP BY u.user_id, u.username, u.sponsor, u.country
        ORDER BY wins DESC, losses ASC, total_matches DESC
        LIMIT ?
    `, [tournamentId, limit]);
    res.json({
        standings: rows.map((p, i) => ({
            user_id: p.user_id, username: p.username, sponsor: p.sponsor, country: p.country,
            wins: parseInt(p.wins) || 0, losses: parseInt(p.losses) || 0,
            total_matches: parseInt(p.total_matches) || 0, placement: i + 1,
        })),
    });
}));

dbRouter.get('/player/:playerId/rankings', asyncRoute(async (req, res) => {
    const { playerId } = req.params;
    const [rankings] = await pool.execute(`
        SELECT t.tournament_id, t.name AS tournament_name, t.start_date,
               COUNT(*) AS total_matches,
               SUM(CASE WHEN m.winner_id = ? THEN 1 ELSE 0 END) AS wins
        FROM tournaments t
        JOIN matches m ON m.tournament_id = t.tournament_id
        WHERE m.player1_id = ? OR m.player2_id = ?
        GROUP BY t.tournament_id, t.name, t.start_date
        ORDER BY t.start_date DESC
    `, [playerId, playerId, playerId]);
    res.json({
        rankings: rankings.map(r => ({
            ...r,
            wins: parseInt(r.wins) || 0,
            losses: (parseInt(r.total_matches) || 0) - (parseInt(r.wins) || 0),
            total_matches: parseInt(r.total_matches) || 0,
        })),
    });
}));

dbRouter.put('/player/:playerId', asyncRoute(async (req, res) => {
    const { playerId } = req.params;
    const { username, sponsor, country, main_character } = req.body;
    const updates = [], values = [];
    if (username      !== undefined) { updates.push('username = ?');       values.push(username); }
    if (sponsor       !== undefined) { updates.push('sponsor = ?');        values.push(sponsor || null); }
    if (country       !== undefined) { updates.push('country = ?');        values.push(country || null); }
    if (main_character !== undefined) { updates.push('main_character = ?'); values.push(main_character || null); }
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
    values.push(playerId);
    await pool.execute(`UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`, values);
    const [[player]] = await pool.execute(
        `SELECT u.*, COUNT(DISTINCT m.match_id) as total_matches,
                SUM(CASE WHEN m.winner_id = u.user_id THEN 1 ELSE 0 END) as wins
         FROM users u LEFT JOIN matches m ON u.user_id = m.player1_id OR u.user_id = m.player2_id
         WHERE u.user_id = ? GROUP BY u.user_id`,
        [playerId]
    );
    try {
        playerHistory = await dbHelpers.loadPlayerHistory();
        io.emit('history-update', playerHistory);
    } catch (e) { console.error('Error broadcasting player history:', e); }
    res.json({ success: true, player });
}));

// Only available outside production — destructive operation.
dbRouter.post('/players/cleanup', asyncRoute(async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'This operation is not available in production.' });
    }
    const [playersToFix] = await pool.execute(
        "SELECT user_id, username, sponsor, country FROM users WHERE username LIKE '% | %'"
    );
    let fixed = 0, merged = 0;
    for (const player of playersToFix) {
        const parts = player.username.split(' | ');
        if (parts.length < 2) continue;
        const extractedSponsor = parts[0];
        const actualName = parts.slice(1).join(' | ');
        const [existing] = await pool.execute(
            'SELECT user_id, sponsor, country FROM users WHERE username = ? AND user_id != ?',
            [actualName, player.user_id]
        );
        if (existing.length > 0) {
            const keep = existing[0];
            for (const col of ['player1_id', 'player2_id', 'winner_id']) {
                await pool.execute(`UPDATE matches SET ${col} = ? WHERE ${col} = ?`, [keep.user_id, player.user_id]);
            }
            await pool.execute(
                'UPDATE users SET sponsor = ?, country = ? WHERE user_id = ?',
                [keep.sponsor || extractedSponsor, keep.country || player.country, keep.user_id]
            );
            await pool.execute('DELETE FROM users WHERE user_id = ?', [player.user_id]);
            merged++;
            console.log(`[Cleanup] Merged: "${player.username}" → "${actualName}"`);
        } else {
            await pool.execute(
                'UPDATE users SET username = ?, sponsor = ? WHERE user_id = ?',
                [actualName, extractedSponsor, player.user_id]
            );
            fixed++;
            console.log(`[Cleanup] Fixed: "${player.username}" → "${actualName}"`);
        }
    }
    playerHistory = await dbHelpers.loadPlayerHistory();
    io.emit('history-update', playerHistory);
    res.json({ success: true, message: `Fixed ${fixed} player names, merged ${merged} duplicates`, fixed, merged });
}));

app.use('/api/db', dbRouter);

// ============================================================
// IFF PLAYER + LOVE & WAR ROUTES  —  /api/iff
// ============================================================

const iffRouter = express.Router();

// --- IFF Players ---

iffRouter.get('/players', asyncRoute(async (req, res) => {
    res.json({ players: await dbHelpers.getAllIFFPlayers() });
}));

iffRouter.get('/player/:id', asyncRoute(async (req, res) => {
    const player = await dbHelpers.getIFFPlayer(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json({ player });
}));

iffRouter.post('/player', asyncRoute(async (req, res) => {
    const data = pickFields(req.body, IFF_PLAYER_FIELDS);
    if (!data.name) return res.status(400).json({ error: 'Player name is required' });
    const player = await dbHelpers.saveIFFPlayer(data);
    io.emit('iff-player-update', player);
    res.json({ success: true, player });
}));

iffRouter.put('/player/:id', asyncRoute(async (req, res) => {
    const data = { ...pickFields(req.body, IFF_PLAYER_FIELDS), id: parseInt(req.params.id) };
    const player = await dbHelpers.saveIFFPlayer(data);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    io.emit('iff-player-update', player);
    res.json({ success: true, player });
}));

iffRouter.delete('/player/:id', asyncRoute(async (req, res) => {
    await dbHelpers.deleteIFFPlayer(req.params.id);
    res.json({ success: true });
}));

// --- Love & War Teams ---

iffRouter.get('/love-and-war/teams', asyncRoute(async (req, res) => {
    res.json({ teams: await dbHelpers.getAllLoveAndWarTeams() });
}));

iffRouter.get('/love-and-war/team/:id', asyncRoute(async (req, res) => {
    const team = await dbHelpers.getLoveAndWarTeam(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json({ team });
}));

iffRouter.post('/love-and-war/team', asyncRoute(async (req, res) => {
    const { team_name, player_1_id, player_2_id } = req.body;
    const team = await dbHelpers.saveLoveAndWarTeam({ team_name, player_1_id, player_2_id });
    io.emit('love-and-war-team-update', team);
    res.json({ team });
}));

iffRouter.put('/love-and-war/team/:id', asyncRoute(async (req, res) => {
    const { team_name, player_1_id, player_2_id } = req.body;
    const team = await dbHelpers.saveLoveAndWarTeam({ id: parseInt(req.params.id), team_name, player_1_id, player_2_id });
    io.emit('love-and-war-team-update', team);
    res.json({ team });
}));

iffRouter.delete('/love-and-war/team/:id', asyncRoute(async (req, res) => {
    await dbHelpers.deleteLoveAndWarTeam(req.params.id);
    res.json({ success: true });
}));

// --- Love & War Display / Match State ---

iffRouter.get('/love-and-war/display-state', (req, res) => res.json(loveAndWarDisplayState));
iffRouter.post('/love-and-war/display-state', (req, res) => {
    loveAndWarDisplayState = patchState(loveAndWarDisplayState, req.body);
    io.emit('love-and-war-display-update', loveAndWarDisplayState);
    res.json(loveAndWarDisplayState);
});

iffRouter.get('/love-and-war/match-data', (req, res) => res.json(lnwMatchData));
iffRouter.post('/love-and-war/match-data', (req, res) => {
    lnwMatchData = patchState(lnwMatchData, req.body);
    io.emit('lnw-match-data', lnwMatchData);
    res.json(lnwMatchData);
});

// --- Love & War Tournaments ---

iffRouter.get('/love-and-war/tournaments', asyncRoute(async (req, res) => {
    res.json({ tournaments: await dbHelpers.getAllLnWTournaments() });
}));

iffRouter.get('/love-and-war/tournament/:id', asyncRoute(async (req, res) => {
    const tournament = await dbHelpers.getLnWTournament(req.params.id);
    if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
    res.json({ tournament });
}));

iffRouter.post('/love-and-war/tournament', asyncRoute(async (req, res) => {
    const { name, format, status, start_date } = req.body;
    res.json({ tournament: await dbHelpers.saveLnWTournament({ name, format, status, start_date }) });
}));

iffRouter.put('/love-and-war/tournament/:id', asyncRoute(async (req, res) => {
    const { name, format, status, start_date } = req.body;
    res.json({ tournament: await dbHelpers.saveLnWTournament({ id: parseInt(req.params.id), name, format, status, start_date }) });
}));

iffRouter.delete('/love-and-war/tournament/:id', asyncRoute(async (req, res) => {
    await dbHelpers.deleteLnWTournament(req.params.id);
    res.json({ success: true });
}));

iffRouter.post('/love-and-war/tournament/:id/teams', asyncRoute(async (req, res) => {
    const { team_id, seed } = req.body;
    await dbHelpers.addTeamToTournament(parseInt(req.params.id), team_id, seed);
    res.json({ tournament: await dbHelpers.getLnWTournament(req.params.id) });
}));

iffRouter.delete('/love-and-war/tournament/:tournamentId/teams/:teamId', asyncRoute(async (req, res) => {
    await dbHelpers.removeTeamFromTournament(parseInt(req.params.tournamentId), parseInt(req.params.teamId));
    res.json({ success: true });
}));

// --- Love & War Matches ---

iffRouter.post('/love-and-war/tournament/:id/matches', asyncRoute(async (req, res) => {
    const { group_id, round, round_order, match_number, team_1_id, team_2_id,
            team_1_score, team_2_score, winner_team_id, next_match_id,
            is_complete, bracket_position } = req.body;
    const match = await dbHelpers.saveLnWMatch({
        tournament_id: parseInt(req.params.id), group_id, round, round_order, match_number,
        team_1_id, team_2_id, team_1_score, team_2_score,
        winner_team_id, next_match_id, is_complete, bracket_position,
    });
    io.emit('lnw-bracket-update', { tournament_id: req.params.id });
    res.json({ match });
}));

iffRouter.put('/love-and-war/match/:id', asyncRoute(async (req, res) => {
    const { tournament_id, group_id, round, round_order, match_number, team_1_id, team_2_id,
            team_1_score, team_2_score, winner_team_id, next_match_id,
            is_complete, bracket_position } = req.body;
    const match = await dbHelpers.saveLnWMatch({
        id: parseInt(req.params.id), tournament_id, group_id, round, round_order, match_number,
        team_1_id, team_2_id, team_1_score, team_2_score,
        winner_team_id, next_match_id, is_complete, bracket_position,
    });
    io.emit('lnw-bracket-update', { tournament_id });
    res.json({ match });
}));

// --- Love & War Rankings & Placements ---

iffRouter.get('/love-and-war/tournament/:id/rankings', asyncRoute(async (req, res) => {
    res.json({ rankings: await dbHelpers.getLnWTournamentRankings(req.params.id) });
}));

iffRouter.post('/love-and-war/tournament/:id/placements', asyncRoute(async (req, res) => {
    const { placements } = req.body;
    await dbHelpers.updateTournamentPlacements(parseInt(req.params.id), placements);
    res.json({ rankings: await dbHelpers.getLnWTournamentRankings(req.params.id) });
}));

// --- Love & War Groups ---

iffRouter.get('/love-and-war/tournament/:id/groups', asyncRoute(async (req, res) => {
    res.json({ groups: await dbHelpers.getLnWGroups(parseInt(req.params.id)) });
}));

iffRouter.get('/love-and-war/group/:id', asyncRoute(async (req, res) => {
    const group = await dbHelpers.getLnWGroup(parseInt(req.params.id));
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json({ group });
}));

iffRouter.post('/love-and-war/tournament/:id/groups', asyncRoute(async (req, res) => {
    const { name, group_order, status } = req.body;
    const group = await dbHelpers.saveLnWGroup({ tournament_id: parseInt(req.params.id), name, group_order, status });
    io.emit('lnw-bracket-update', { tournament_id: req.params.id });
    res.json({ group });
}));

iffRouter.put('/love-and-war/group/:id', asyncRoute(async (req, res) => {
    const { name, group_order, status, tournament_id } = req.body;
    const group = await dbHelpers.saveLnWGroup({ id: parseInt(req.params.id), name, group_order, status, tournament_id });
    io.emit('lnw-bracket-update', { tournament_id: group.tournament_id });
    res.json({ group });
}));

iffRouter.delete('/love-and-war/group/:id', asyncRoute(async (req, res) => {
    const group = await dbHelpers.getLnWGroup(parseInt(req.params.id));
    await dbHelpers.deleteLnWGroup(parseInt(req.params.id));
    if (group) io.emit('lnw-bracket-update', { tournament_id: group.tournament_id });
    res.json({ success: true });
}));

iffRouter.post('/love-and-war/group/:groupId/teams/:teamId', asyncRoute(async (req, res) => {
    const { tournament_id } = req.body;
    await dbHelpers.assignTeamToGroup(parseInt(tournament_id), parseInt(req.params.teamId), parseInt(req.params.groupId));
    io.emit('lnw-bracket-update', { tournament_id });
    res.json({ success: true });
}));

iffRouter.delete('/love-and-war/group/:groupId/teams/:teamId', asyncRoute(async (req, res) => {
    const { tournament_id } = req.body;
    await dbHelpers.removeTeamFromGroup(parseInt(tournament_id), parseInt(req.params.teamId));
    io.emit('lnw-bracket-update', { tournament_id });
    res.json({ success: true });
}));

app.use('/api/iff', requireRibAuth, iffRouter);

// ============================================================
// SOCKET.IO
// ============================================================

io.use((socket, next) => {
    socket.handshake.auth.token === CONNECTION_KEY
        ? next()
        : next(new Error('Invalid connection key'));
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Push the full current state to the newly connected client immediately.
    socket.emit('data-update',               overlayData);
    socket.emit('tag-team-data',             tagTeamData);
    socket.emit('rib-match-cards-update',    ribMatchCards);
    socket.emit('rib-player-stats-update',   ribPlayerStats);
    socket.emit('rib-stream-data-update',    ribStreamData);
    socket.emit('rib-overlay-state-update',  ribOverlayState);
    socket.emit('love-and-war-display-update', loveAndWarDisplayState);
    socket.emit('lnw-match-data',            lnwMatchData);
    socket.emit('lnw-display-mode',          lnwDisplayMode);

    socket.on('update-data', async (data) => {
        try {
            overlayData = data;
            await dbHelpers.saveIFLData(overlayData);
            const players = [
                { name: data.p1Name, team: data.p1Team, flag: data.p1Flag },
                { name: data.p2Name, team: data.p2Team, flag: data.p2Flag },
            ].filter(p => p.name);
            if (players.length > 0) {
                await dbHelpers.savePlayerHistory(players);
                io.emit('history-update', await dbHelpers.loadPlayerHistory());
            }
            io.emit('data-update', overlayData);
        } catch (err) { console.error('Error handling update-data:', err); }
    });

    socket.on('tag-team-update', async (data) => {
        try {
            tagTeamData = data;
            await dbHelpers.saveTagTeamData(tagTeamData);
            io.emit('tag-team-data', tagTeamData);
        } catch (err) { console.error('Error handling tag-team-update:', err); }
    });

    // Pass-through relay events — no persistence needed.
    socket.on('top8-data',           data => io.emit('top8-data', data));
    socket.on('top8-refresh',        data => io.emit('top8-refresh', data));
    socket.on('top8-standings-data', data => io.emit('top8-standings-data', data));

    socket.on('rib-match-cards-update', async (data) => {
        try {
            ribMatchCards = data;
            await dbHelpers.saveRIBMatchCards(ribMatchCards);
            io.emit('rib-match-cards-update', ribMatchCards);
        } catch (err) { console.error('Error handling rib-match-cards-update:', err); }
    });

    socket.on('rib-player-stats-update', async (data) => {
        try {
            ribPlayerStats = data;
            await dbHelpers.saveRIBPlayerStats(ribPlayerStats);
            io.emit('rib-player-stats-update', ribPlayerStats);
        } catch (err) { console.error('Error handling rib-player-stats-update:', err); }
    });

    socket.on('rib-stream-data-update', async (data) => {
        try {
            ribStreamData = data;
            await dbHelpers.saveRIBStreamData(ribStreamData);
            io.emit('rib-stream-data-update', ribStreamData);
        } catch (err) { console.error('Error handling rib-stream-data-update:', err); }
    });

    socket.on('rib-overlay-state-update', data => {
        ribOverlayState = patchState(ribOverlayState, data);
        io.emit('rib-overlay-state-update', ribOverlayState);
    });

    socket.on('love-and-war-display-select', data => {
        loveAndWarDisplayState = patchState(loveAndWarDisplayState, data);
        io.emit('love-and-war-display-update', loveAndWarDisplayState);
    });

    socket.on('lnw-match-update', data => {
        lnwMatchData = patchState(lnwMatchData, data);
        io.emit('lnw-match-data', lnwMatchData);
    });

    socket.on('lnw-display-mode', data => {
        lnwDisplayMode = patchState(lnwDisplayMode, data);
        io.emit('lnw-display-mode', lnwDisplayMode);
    });

    socket.on('lnw-refresh-overlay', () => {
        io.emit('lnw-refresh-overlay');
        setTimeout(() => {
            io.emit('lnw-match-data',   lnwMatchData);
            io.emit('lnw-display-mode', lnwDisplayMode);
        }, 100);
    });
});

// Catch-all: serve the React SPA for any non-API route.
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')));
