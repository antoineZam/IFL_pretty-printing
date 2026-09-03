require('dotenv').config();
const express = require('express');
const compression = require('compression');
const http    = require('http');
const socketIo = require('socket.io');
const fs   = require('fs');
const crypto = require('crypto');
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

// ------------------------------------------------------------
// Security headers
//
// Nothing was sent before: no nosniff, no referrer policy, no framing policy.
// Set by hand rather than via helmet to keep the dependency count down and to
// stay explicit about the one header that needs care here -- a strict CSP would
// break the overlay pages, which load artwork from /source and fonts from
// Google, so it is deliberately not set. HSTS is only meaningful behind TLS.
// ------------------------------------------------------------
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

// gzip everything text-shaped. The client bundle and the JSON payloads that
// overlays poll compress to roughly a quarter of their size.
app.use(compression());

const CLIENT_DIST = path.join(__dirname, 'client', 'dist');

// Timestamp of the bundle this server is serving, so a stale dist is visible
// rather than something you discover on air.
let clientBuildTime = 'unknown';
try {
    clientBuildTime = fs.statSync(path.join(CLIENT_DIST, 'index.html')).mtime.toISOString();
} catch {
    /* reported by the guard below */
}

// client/dist is gitignored build output, so a fresh clone has no bundle to
// serve -- previously that produced a silent nothing on every page. Say so at
// boot instead of at the first request.
if (!fs.existsSync(path.join(CLIENT_DIST, 'index.html'))) {
    console.error('FATAL: client/dist/index.html not found -- the client has not been built.');
    console.error('Run "npm run build" (or "npm run setup" on a fresh clone) and restart.');
    console.error('For local development with hot reload, use "npm run dev" and open http://localhost:5173.');
    process.exit(1);
}
console.log(`Serving client bundle built ${clientBuildTime}.`);

// Overlay artwork and fonts are large and effectively static. Caching them for a
// day stops every OBS scene reload from re-fetching hundreds of megabytes;
// revalidation still happens via ETag once the window lapses.
//
// Mounted ahead of the dist handler on purpose: the vite build also copies
// public/ into dist/, so with the old ordering /source/* was answered by the
// dist handler instead and picked up its default no-cache headers.
// This mount is deliberately public: OBS browser sources cannot send an auth
// header, so overlay artwork has to be reachable without one. That makes it the
// wrong place for anything that is not artwork -- and it was holding the
// orphaned data JSONs (one carrying real competitor tags) and a 42 MB
// overlay_archive.zip that no code references. Serve images, fonts and media
// only; everything else under the tree is refused.
const SOURCE_SERVABLE = /\.(png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|mov|woff2?|ttf|otf|eot|css)$/i;

app.use('/source', (req, res, next) => {
    // `req.path` here is already relative to the mount point.
    if (!SOURCE_SERVABLE.test(req.path)) {
        return res.status(404).json({ error: 'Not found' });
    }
    next();
});

app.use('/source', express.static(path.join(__dirname, 'client', 'public', 'source'), {
    maxAge: '1d',
}));

// Vite fingerprints everything under /assets, so those files can never change
// behind a given URL -- serve them as permanently cacheable. index.html must not
// be cached or clients would keep booting a stale bundle after a deploy.
app.use('/assets', express.static(path.join(CLIENT_DIST, 'assets'), {
    immutable: true,
    maxAge: '1y',
}));
app.use(express.static(CLIENT_DIST, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache');
    },
}));

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

// IFF9 in-memory state (resilient to DB outages, like lnwMatchData).
let iff9DisplayMode = { mode: 'idle', visible: false };
let iff9MatchData = {
    week_name: 'IFF9 Qualifiers',
    week_number: 1,
    event_date: null,
    match_number: 1,
    match_type: 'challengers',
    round_name: '',
    player_1_id: null,
    player_1_name: 'Player 1',
    player_1_info: '',
    player_1_character: '',
    player_1_score: 0,
    player_1_country: '',
    player_1_rank: null,
    player_2_id: null,
    player_2_name: 'Player 2',
    player_2_info: '',
    player_2_character: '',
    player_2_score: 0,
    player_2_country: '',
    player_2_rank: null,
    win_score: 3,
};
let iff9Lineup = { week_name: 'IFF9 Qualifiers', week_number: 1, event_date: null, matches: [] };

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
        // Reuse the canonical defaults rather than a second hand-maintained copy.
        // The two used to disagree: this one carried p1Loser/p2Loser while the
        // database path omitted them, and they meant different things by
        // `eventNumber`.
        overlayData    = { ...dbHelpers.DEFAULT_IFL_DATA };
        tagTeamData    = { ...dbHelpers.DEFAULT_TAG_TEAM_DATA };
        playerHistory  = [];
        ribMatchCards  = { ...dbHelpers.DEFAULT_RIB_MATCH_CARDS };
        ribPlayerStats = { ...dbHelpers.DEFAULT_RIB_PLAYER_STATS };
        ribStreamData  = { ...dbHelpers.DEFAULT_RIB_STREAM_DATA };
    }
}

initializeData()
    .then(() => server.listen(port, () => console.log(`Server running at http://localhost:${port}`)))
    .catch(err => { console.error('Fatal: could not initialize data:', err); process.exit(1); });

// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================
//
// Without this, a restart dropped every socket without notice, abandoned the
// coalesced scoreboard write still pending in memory and never drained the
// MySQL pool. On a machine that also runs OBS that restart tends to happen at
// the worst possible moment.
let shuttingDown = false;
async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`
${signal} received — shutting down.`);

    // Hard deadline: never hang a restart waiting on a stuck connection.
    const forceExit = setTimeout(() => {
        console.error('Shutdown timed out after 10s — forcing exit.');
        process.exit(1);
    }, 10000);
    forceExit.unref();

    try {
        // 1. Tell overlays the server is going away so they show a reconnect state
        //    rather than freezing on the last frame they received.
        io.emit('server-shutdown');
        io.close();

        // 2. Stop accepting new requests.
        await new Promise(resolve => server.close(resolve));

        // 3. Flush the scoreboard write that may still be coalescing in memory.
        await flushOverlayPersist();

        // 4. Drain the connection pool.
        await pool.end();
        console.log('Shutdown complete.');
        clearTimeout(forceExit);
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

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
        // Full detail to the server log, a generic message to the client: raw
        // err.message from mysql2 carries table names, column names and SQL
        // fragments. The id lets an operator find the matching log line.
        const errorId = Math.random().toString(36).slice(2, 10);
        console.error(`[${errorId}] ${req.method} ${req.originalUrl}`, err);
        res.status(500).json({
            error: 'Internal server error',
            errorId,
            ...(process.env.NODE_ENV !== 'production' ? { detail: err.message } : {}),
        });
    }
};

/**
 * Fires a persistence write without blocking the broadcast, and tells the
 * operator if it failed.
 *
 * These writes were stubs that logged and returned, so nothing ever surfaced a
 * failure. Now that they hit the database, a failed save must be visible --
 * otherwise the control page still shows a green light while the data is lost
 * on the next restart, which is the exact failure this replaced.
 */
function persistState(label, socket, write) {
    Promise.resolve()
        .then(write)
        .catch(err => {
            console.error(`Error persisting ${label}:`, err);
            socket.emit('persist-error', {
                what: label,
                message: 'Change is live on the overlay but was NOT saved — it will be lost on restart.',
            });
        });
}

/**
 * Merges a patch into a state object, updating only the keys
 * already present in `current`. Extra keys in `patch` are silently
 * dropped, preventing clients from injecting arbitrary state.
 * A patch value of `undefined` is treated as "no change".
 */
function patchState(current, patch, label = 'state') {
    const result = {};
    for (const key of Object.keys(current)) {
        result[key] = (patch != null && patch[key] !== undefined) ? patch[key] : current[key];
    }

    // Dropping unknown keys is the point -- it stops a client injecting arbitrary
    // state. But it used to be silent, so the day someone added a field to the
    // client's TypeScript interface it was discarded with no error and no log,
    // and the only symptom was a value that never arrived. Say so.
    if (patch != null && typeof patch === 'object') {
        const unknown = Object.keys(patch).filter(key => !(key in current));
        if (unknown.length > 0) {
            console.warn(
                `[${label}] Ignored unknown field(s): ${unknown.join(', ')}. ` +
                'The server state object has no such key -- add it there (and to the ' +
                'client type) if it is meant to be part of this payload.'
            );
        }
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

// ------------------------------------------------------------
// Auth endpoint hardening
//
// Both endpoints compared a submitted key against an environment variable and
// returned immediately, with no delay, lockout or logging, and with a
// short-circuiting === comparison. A strong random key already makes brute force
// impractical, so this is defence in depth -- but nothing stopped an unbounded
// guessing loop, and nothing recorded that one had happened.
// ------------------------------------------------------------

/**
 * Comparison whose duration does not depend on how many leading characters
 * matched. `===` on strings bails at the first difference.
 */
function safeEqual(a, b) {
    const bufA = Buffer.from(String(a ?? ''), 'utf8');
    const bufB = Buffer.from(String(b ?? ''), 'utf8');
    // timingSafeEqual requires equal lengths; hash first so length is constant.
    const hashA = crypto.createHash('sha256').update(bufA).digest();
    const hashB = crypto.createHash('sha256').update(bufB).digest();
    return crypto.timingSafeEqual(hashA, hashB);
}

const AUTH_WINDOW_MS   = 15 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 10;
const authAttempts = new Map();   // ip -> { count, firstAt, blockedUntil }

// Bounded so a spray across many source addresses cannot grow this without limit.
const AUTH_TRACKER_MAX = 5000;

function authRateLimit(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    let entry = authAttempts.get(ip);

    if (entry && now - entry.firstAt > AUTH_WINDOW_MS) {
        entry = undefined;
        authAttempts.delete(ip);
    }

    if (entry?.blockedUntil && now < entry.blockedUntil) {
        const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({
            success: false,
            message: `Too many failed attempts. Try again in ${retryAfter}s.`,
        });
    }

    if (authAttempts.size > AUTH_TRACKER_MAX) {
        for (const [key, value] of authAttempts) {
            if (now - value.firstAt > AUTH_WINDOW_MS) authAttempts.delete(key);
        }
    }

    // Handed to the route so it can record the outcome.
    req.recordAuthResult = (ok) => {
        if (ok) {
            authAttempts.delete(ip);
            return;
        }
        const current = authAttempts.get(ip) ?? { count: 0, firstAt: now };
        current.count += 1;
        if (current.count >= AUTH_MAX_ATTEMPTS) {
            current.blockedUntil = now + AUTH_WINDOW_MS;
            console.warn(`[auth] ${ip} blocked after ${current.count} failed attempts.`);
        } else {
            console.warn(`[auth] Failed attempt ${current.count}/${AUTH_MAX_ATTEMPTS} from ${ip}.`);
        }
        authAttempts.set(ip, current);
    };

    next();
}

// Public auth endpoints — must be registered before the requireAuth middleware.
app.post('/api/auth', authRateLimit, (req, res) => {
    if (safeEqual(req.body.key, CONNECTION_KEY)) {
        req.recordAuthResult(true);
        return res.json({ success: true });
    }
    req.recordAuthResult(false);
    res.status(401).json({ success: false, message: 'Invalid connection key' });
});

app.post('/api/rib-auth', authRateLimit, (req, res) => {
    if (!IFF_ACCESS_KEY) return res.json({ success: true, message: 'No RIB key required' });
    if (safeEqual(req.body.key, IFF_ACCESS_KEY)) {
        req.recordAuthResult(true);
        return res.json({ success: true });
    }
    req.recordAuthResult(false);
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
    dbHelpers.invalidatePlayerCaches();
    // Also invalidate the tournament cache, as the delete-by-id route does.
    // Deleting a player can remove the match the live scoreboard is writing to,
    // and the cached match id would otherwise keep pointing at a dead row.
    dbHelpers.invalidateTournamentCache();
    if (result.affectedRows > 0) return res.json({ success: true, message: 'Player deleted.' });
    res.status(404).json({ success: false, message: 'Player not found.' });
}));

app.use('/api/history', historyRouter);

// ============================================================
// RUN IT BACK ROUTES  —  /api/rib
// ============================================================

// No page in the client uses these -- every Run It Back page talks over sockets
// -- but they are kept as the REST surface for the same state, so an operator or
// a script can read and set it without a socket.
//
// The GETs serve the in-memory state rather than re-reading the database. That
// state is loaded from the database at boot and is what the sockets broadcast,
// so a REST reader and an overlay now always agree. (They previously returned
// hardcoded defaults, contradicting what was on air.)
const ribRouter = express.Router();

ribRouter.get('/match-cards', (req, res) => res.json(ribMatchCards));
ribRouter.post('/match-cards', asyncRoute(async (req, res) => {
    ribMatchCards = req.body;
    await dbHelpers.saveRIBMatchCards(ribMatchCards);
    io.emit('rib-match-cards-update', ribMatchCards);
    res.json(ribMatchCards);
}));

ribRouter.get('/player-stats', (req, res) => res.json(ribPlayerStats));
ribRouter.post('/player-stats', asyncRoute(async (req, res) => {
    ribPlayerStats = req.body;
    await dbHelpers.saveRIBPlayerStats(ribPlayerStats);
    io.emit('rib-player-stats-update', ribPlayerStats);
    res.json(ribPlayerStats);
}));

ribRouter.get('/stream-data', (req, res) => res.json(ribStreamData));
ribRouter.post('/stream-data', asyncRoute(async (req, res) => {
    ribStreamData = req.body;
    await dbHelpers.saveRIBStreamData(ribStreamData);
    io.emit('rib-stream-data-update', ribStreamData);
    res.json(ribStreamData);
}));

ribRouter.get('/overlay-state', (req, res) => res.json(ribOverlayState));
ribRouter.post('/overlay-state', (req, res) => {
    ribOverlayState = patchState(ribOverlayState, req.body, 'ribOverlayState');
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

// Long-running by nature: each tournament is a few thousand sequential queries
// over the SSH tunnel this deployment uses, multiplied by up to 50 tournaments,
// all inside one HTTP request. Node's default 2-minute socket timeout would cut
// the response off long before it finished -- the sync itself kept running, so
// the caller saw a failure while the work continued invisibly.
//
// The timeout is lifted for this route only, and a deadline stops the loop
// cleanly rather than letting it run unbounded. Partial results are returned.
const SYNC_ALL_DEADLINE_MS = 30 * 60 * 1000;

startggRouter.post('/ifl/sync-all', asyncRoute(async (req, res) => {
    req.setTimeout(0);
    res.setTimeout(0);
    const deadline = Date.now() + SYNC_ALL_DEADLINE_MS;

    const tournaments = await startgg.searchIronFistLeagueTournaments(50);
    console.log(`[Sync] sync-all starting: ${tournaments.length} tournaments found.`);
    const results = [];
    let timedOut = false;
    for (const t of tournaments) {
        if (Date.now() > deadline) {
            timedOut = true;
            console.warn(`[Sync] sync-all hit its ${SYNC_ALL_DEADLINE_MS / 60000}-minute deadline; stopping.`);
            results.push({ slug: t.slug, name: t.name, success: false, error: 'Skipped: sync-all deadline reached' });
            continue;
        }
        try {
            const r = await startggSync.syncTournamentFromStartGG(t.slug);
            const ok = r.complete !== false;
            console.log(`[Sync] ${ok ? '✓' : '⚠'} ${t.name}${ok ? '' : ` (${r.warnings.length} warning(s))`}`);
            results.push({ slug: t.slug, name: t.name, success: ok, ...r });
        } catch (e) {
            console.error(`[Sync] ✗ ${t.name}: ${e.message}`);
            results.push({ slug: t.slug, name: t.name, success: false, error: e.message });
        }
    }
    const synced = results.filter(r => r.success).length;
    console.log(`[Sync] sync-all complete: ${synced}/${tournaments.length} succeeded.`);

    const [cleaned] = await pool.execute(
        `DELETE FROM users WHERE NOT EXISTS (
            SELECT 1 FROM matches
            WHERE users.user_id = matches.player1_id OR users.user_id = matches.player2_id
        ) AND EXISTS (SELECT 1 FROM matches)`
    );
    // The sync wrote users and matches straight through the pool, so the
    // in-memory player/match caches no longer reflect the tables.
    dbHelpers.invalidatePlayerCaches();
    dbHelpers.invalidateTournamentCache();
    startgg.clearCache();
    const playersRemoved = cleaned.affectedRows || 0;
    if (playersRemoved > 0) console.log(`[Sync] Cleaned up ${playersRemoved} players with 0 matches`);

    res.json({
        totalFound: tournaments.length,
        synced,
        failed: tournaments.length - synced,
        timedOut,
        results,
        playersRemoved,
    });
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
    // Returns { events: [...] }, not the raw GraphQL envelope. The standings
    // control page reads data.events; answering {tournament:{events}} made that
    // permanently undefined, so its event list was always empty and standings
    // could never be loaded from that page.
    const data = await startgg.getTournamentEvents(req.params.slug, {
        eventSlug: req.query.eventSlug || null,
        includeSets: false,
    });
    res.json({
        tournament: data?.tournament ?? null,
        events: data?.tournament?.events ?? [],
    });
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

    const [cleaned] = await pool.execute(
        `DELETE FROM users WHERE NOT EXISTS (
            SELECT 1 FROM matches
            WHERE users.user_id = matches.player1_id OR users.user_id = matches.player2_id
        ) AND EXISTS (SELECT 1 FROM matches)`
    );
    // The sync wrote users and matches straight through the pool, so the
    // in-memory player/match caches no longer reflect the tables.
    dbHelpers.invalidatePlayerCaches();
    dbHelpers.invalidateTournamentCache();
    startgg.clearCache();
    const playersRemoved = cleaned.affectedRows || 0;
    if (playersRemoved > 0) console.log(`[Sync] Cleaned up ${playersRemoved} players with 0 matches`);

    // "success" now means the sync actually completed. A run that lost a page of
    // sets or failed participant lookup used to answer an unqualified
    // "Tournament synced successfully" -- indistinguishable from a clean run.
    const complete = result.complete !== false;
    res.json({
        success: complete,
        message: complete
            ? 'Tournament synced successfully'
            : `Tournament synced with ${result.warnings.length} problem(s) — data may be incomplete.`,
        ...result,
        playersRemoved,
    });
}));

startggRouter.post('/sync/player/:slug', asyncRoute(async (req, res) => {
    const userId = await startggSync.syncPlayerFromStartGG(req.params.slug);
    dbHelpers.invalidatePlayerCaches();
    startgg.clearCache();
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
    dbHelpers.invalidatePlayerCaches();
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

dbRouter.delete('/player/:playerId', asyncRoute(async (req, res) => {
    const { playerId } = req.params;
    await pool.execute('DELETE FROM matches WHERE player1_id = ? OR player2_id = ?', [playerId, playerId]);
    const [result] = await pool.execute('DELETE FROM users WHERE user_id = ?', [playerId]);
    dbHelpers.invalidatePlayerCaches();
    dbHelpers.invalidateTournamentCache();
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Player not found' });
    }
    try {
        playerHistory = await dbHelpers.loadPlayerHistory();
        io.emit('history-update', playerHistory);
    } catch (e) { console.error('Error broadcasting player history:', e); }
    res.json({ success: true });
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
    dbHelpers.invalidatePlayerCaches();
    dbHelpers.invalidateTournamentCache();
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
    loveAndWarDisplayState = patchState(loveAndWarDisplayState, req.body, 'loveAndWarDisplayState');
    io.emit('love-and-war-display-update', loveAndWarDisplayState);
    res.json(loveAndWarDisplayState);
});

iffRouter.get('/love-and-war/match-data', (req, res) => res.json(lnwMatchData));
iffRouter.post('/love-and-war/match-data', (req, res) => {
    lnwMatchData = patchState(lnwMatchData, req.body, 'lnwMatchData');
    io.emit('lnw-match-data', lnwMatchData);
    res.json(lnwMatchData);
});

// ============================================================
// IFF9 ROUTES  —  /api/iff/iff-9
// ============================================================

// --- IFF9 Live overlay state (in-memory) ---
iffRouter.get('/iff-9/match-data', (req, res) => res.json(iff9MatchData));
iffRouter.post('/iff-9/match-data', (req, res) => {
    iff9MatchData = patchState(iff9MatchData, req.body, 'iff9MatchData');
    io.emit('iff9-match-data', iff9MatchData);
    res.json(iff9MatchData);
});

iffRouter.get('/iff-9/lineup', (req, res) => res.json(iff9Lineup));
iffRouter.post('/iff-9/lineup', (req, res) => {
    iff9Lineup = req.body || iff9Lineup;
    io.emit('iff9-lineup', iff9Lineup);
    res.json(iff9Lineup);
});

iffRouter.get('/iff-9/display-mode', (req, res) => res.json(iff9DisplayMode));

// --- IFF9 Weeks (DB persistence) ---
iffRouter.get('/iff-9/weeks', asyncRoute(async (req, res) => {
    res.json({ weeks: await dbHelpers.getIFF9Weeks() });
}));

iffRouter.get('/iff-9/week/:id', asyncRoute(async (req, res) => {
    const week = await dbHelpers.getIFF9Week(req.params.id);
    if (!week) return res.status(404).json({ error: 'Week not found' });
    res.json({ week });
}));

iffRouter.post('/iff-9/week', asyncRoute(async (req, res) => {
    const { name, week_number, event_date, status } = req.body;
    res.json({ week: await dbHelpers.saveIFF9Week({ name, week_number, event_date, status }) });
}));

iffRouter.put('/iff-9/week/:id', asyncRoute(async (req, res) => {
    const { name, week_number, event_date, status } = req.body;
    res.json({ week: await dbHelpers.saveIFF9Week({ id: parseInt(req.params.id), name, week_number, event_date, status }) });
}));

iffRouter.delete('/iff-9/week/:id', asyncRoute(async (req, res) => {
    await dbHelpers.deleteIFF9Week(req.params.id);
    res.json({ success: true });
}));

// --- IFF9 Matches (DB persistence) ---
iffRouter.post('/iff-9/week/:id/match', asyncRoute(async (req, res) => {
    const match = await dbHelpers.saveIFF9Match({ ...req.body, week_id: parseInt(req.params.id) });
    res.json({ match });
}));

iffRouter.put('/iff-9/match/:id', asyncRoute(async (req, res) => {
    const match = await dbHelpers.saveIFF9Match({ ...req.body, id: parseInt(req.params.id) });
    res.json({ match });
}));

iffRouter.delete('/iff-9/match/:id', asyncRoute(async (req, res) => {
    await dbHelpers.deleteIFF9Match(req.params.id);
    res.json({ success: true });
}));

iffRouter.post('/iff-9/week/:id/reorder', asyncRoute(async (req, res) => {
    await dbHelpers.reorderIFF9Matches(req.body.order || []);
    res.json({ success: true });
}));

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
// SCOREBOARD PERSISTENCE
//
// Score buttons fire in bursts. Writing each intermediate state to MySQL is
// wasted work -- only the latest one matters -- so writes are coalesced behind
// a single in-flight save and the newest pending state always wins.
// ============================================================

let persistInFlight = false;
let persistPending  = null;
// Held so shutdown can wait for a write that is queued or already running.
let persistPromise  = Promise.resolve();

function queueOverlayPersist(data) {
    persistPending = data;
    if (persistInFlight) return;
    persistInFlight = true;
    // Defer past the current tick so a rapid burst collapses into one write.
    persistPromise = new Promise(resolve => {
        setImmediate(() => { runOverlayPersist().then(resolve, resolve); });
    });
}

/**
 * Resolves once every queued scoreboard write has hit the database.
 * Called on shutdown so a restart does not drop the last score press.
 */
function flushOverlayPersist() {
    return persistPromise;
}

async function runOverlayPersist() {
    try {
        while (persistPending) {
            const data = persistPending;
            persistPending = null;
            try {
                await dbHelpers.saveIFLData(data);
                const players = [
                    { name: data.p1Name, team: data.p1Team, flag: data.p1Flag },
                    { name: data.p2Name, team: data.p2Team, flag: data.p2Flag },
                ].filter(p => p.name);
                if (players.length > 0) {
                    await dbHelpers.savePlayerHistory(players);
                    // Only re-broadcast the (whole) player list when a row actually
                    // changed; the common case is the same two players repeatedly.
                    if (dbHelpers.isPlayerHistoryStale()) {
                        playerHistory = await dbHelpers.loadPlayerHistory();
                        io.emit('history-update', playerHistory);
                    }
                }
            } catch (err) {
                console.error('Error persisting overlay data:', err);
            }
        }
    } finally {
        persistInFlight = false;
    }
}

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
    socket.emit('iff9-match-data',           iff9MatchData);
    socket.emit('iff9-lineup',               iff9Lineup);
    socket.emit('iff9-display-mode',         iff9DisplayMode);

    socket.on('update-data', (data) => {
        // Overlays get the new scoreboard on this tick. Persistence used to run
        // first, which meant every score button press waited on a chain of
        // database round-trips before anything moved on stream.
        overlayData = data;
        io.emit('data-update', overlayData);
        queueOverlayPersist(data);
    });

    // Broadcast first, persist after. A database hiccup must never hold up what
    // is on screen -- and now that these saves are real (they used to be stubs)
    // an await here would put a MySQL round-trip in front of every operator
    // action. Persistence failures are logged and surfaced to the operator.
    socket.on('tag-team-update', (data) => {
        tagTeamData = data;
        io.emit('tag-team-data', tagTeamData);
        persistState('tag-team', socket, () => dbHelpers.saveTagTeamData(tagTeamData));
    });

    // Pass-through relay events — no persistence needed.
    socket.on('top8-data',           data => io.emit('top8-data', data));
    socket.on('top8-refresh',        data => io.emit('top8-refresh', data));
    socket.on('top8-standings-data', data => io.emit('top8-standings-data', data));

    socket.on('rib-match-cards-update', (data) => {
        ribMatchCards = data;
        io.emit('rib-match-cards-update', ribMatchCards);
        persistState('rib-match-cards-update', socket, () => dbHelpers.saveRIBMatchCards(ribMatchCards));
    });

    socket.on('rib-player-stats-update', (data) => {
        ribPlayerStats = data;
        io.emit('rib-player-stats-update', ribPlayerStats);
        persistState('rib-player-stats-update', socket, () => dbHelpers.saveRIBPlayerStats(ribPlayerStats));
    });

    socket.on('rib-stream-data-update', (data) => {
        ribStreamData = data;
        io.emit('rib-stream-data-update', ribStreamData);
        persistState('rib-stream-data-update', socket, () => dbHelpers.saveRIBStreamData(ribStreamData));
    });

    socket.on('rib-overlay-state-update', data => {
        ribOverlayState = patchState(ribOverlayState, data, 'ribOverlayState');
        io.emit('rib-overlay-state-update', ribOverlayState);
    });

    socket.on('love-and-war-display-select', data => {
        loveAndWarDisplayState = patchState(loveAndWarDisplayState, data, 'loveAndWarDisplayState');
        io.emit('love-and-war-display-update', loveAndWarDisplayState);
    });

    socket.on('lnw-match-update', data => {
        lnwMatchData = patchState(lnwMatchData, data, 'lnwMatchData');
        io.emit('lnw-match-data', lnwMatchData);
    });

    socket.on('lnw-display-mode', data => {
        lnwDisplayMode = patchState(lnwDisplayMode, data, 'lnwDisplayMode');
        io.emit('lnw-display-mode', lnwDisplayMode);
    });

    socket.on('lnw-refresh-overlay', () => {
        io.emit('lnw-refresh-overlay');
        setTimeout(() => {
            io.emit('lnw-match-data',   lnwMatchData);
            io.emit('lnw-display-mode', lnwDisplayMode);
        }, 100);
    });

    // --- IFF9 ---
    socket.on('iff9-match-update', data => {
        iff9MatchData = patchState(iff9MatchData, data, 'iff9MatchData');
        io.emit('iff9-match-data', iff9MatchData);
    });

    socket.on('iff9-lineup-update', data => {
        iff9Lineup = data || iff9Lineup;
        io.emit('iff9-lineup', iff9Lineup);
    });

    socket.on('iff9-display-mode', data => {
        iff9DisplayMode = patchState(iff9DisplayMode, data, 'iff9DisplayMode');
        io.emit('iff9-display-mode', iff9DisplayMode);
    });

    socket.on('iff9-refresh-overlay', () => {
        io.emit('iff9-refresh-overlay');
        setTimeout(() => {
            io.emit('iff9-match-data',   iff9MatchData);
            io.emit('iff9-lineup',       iff9Lineup);
            io.emit('iff9-display-mode', iff9DisplayMode);
        }, 100);
    });
});

// An /api path that matched no router is a mistyped or removed endpoint. Without
// this it fell through to the SPA catch-all below and answered 200 with
// index.html, so the caller got a JSON parse error instead of a clean 404.
app.use('/api', (req, res) => {
    res.status(404).json({ error: `No such API route: ${req.method} ${req.originalUrl}` });
});

// Catch-all: serve the React SPA for any non-API route.
//
// A header records which server answered and when its bundle was built. During
// development Vite (5173) serves current source while this server (3000) serves
// whatever stale client/dist happens to be on disk -- both answer the same
// overlay URLs, so an OBS source pointed at the wrong one silently renders the
// last build instead of the running code, with nothing to say which you are
// looking at. Check the response header, or the banner it drives below.
app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Served-By', `express:${port}`);
    res.setHeader('X-Bundle-Built', clientBuildTime);
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});
