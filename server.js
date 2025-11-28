require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

// Set default connection key
const CONNECTION_KEY = process.env.CONNECTION_KEY;

if (!CONNECTION_KEY) {
    console.error("FATAL ERROR: CONNECTION_KEY is not defined in your .env file.");
    console.error("Please create a file named .env in the project root and add the following line:");
    console.error("CONNECTION_KEY=your_secret_key_here");
    process.exit(1); // Stop the server if the key is not configured
}

console.log('Connection key loaded successfully.');

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

// Define absolute paths for safety
const SOURCE_DIR = path.join(__dirname, 'client', 'public', 'source');
const DATA_FILE = path.join(SOURCE_DIR, 'data/ifl-data.json');
const TAG_TEAM_FILE = path.join(SOURCE_DIR, 'data/tag-team-data.json');
const PLAYER_HISTORY_FILE = path.join(SOURCE_DIR, 'data/player-history.json');

// Run It Back files
const RIB_MATCH_CARDS_FILE = path.join(SOURCE_DIR, 'data/run-it-back/match-cards.json');
const RIB_PLAYER_STATS_FILE = path.join(SOURCE_DIR, 'data/run-it-back/player-stats.json');
const RIB_STREAM_DATA_FILE = path.join(SOURCE_DIR, 'data/run-it-back/stream-data.json');

// Ensure the source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
}

// --- DATA MANAGEMENT ---

function loadData() {
  try {
    // Try to read the file
    if (!fs.existsSync(DATA_FILE)) throw new Error('File does not exist');
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    if (!rawData.trim()) throw new Error('File is empty');
    
    return JSON.parse(rawData);
  } catch (error) {
    console.log('Creating new 1v1 data file...');
    const defaultData = {
      p1Flag: 'fr', p1Team: 'Team 1', p1Name: 'Player 1',
      p2Flag: 'rn', p2Team: 'Team 2', p2Name: 'Player 2',
      p1Score: 0, p2Score: 0,
      round: 'Winners Round 1', eventNumber: '1'
    };
    saveData(defaultData);
    return defaultData;
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving 1v1 data:', error);
  }
}

function loadTagTeamData() {
  try {
    if (!fs.existsSync(TAG_TEAM_FILE)) throw new Error('File does not exist');
    const rawData = fs.readFileSync(TAG_TEAM_FILE, 'utf8');
    if (!rawData.trim()) throw new Error('File is empty');
    
    return JSON.parse(rawData);
  } catch (error) {
    console.log('Creating new Tag Team data file...');
    const defaultData = {
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
    saveTagTeamData(defaultData);
    return defaultData;
  }
}

function saveTagTeamData(data) {
  try {
    fs.writeFileSync(TAG_TEAM_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving tag team data:', error);
  }
}

function loadPlayerHistory() {
    try {
        if (!fs.existsSync(PLAYER_HISTORY_FILE)) return [];
        const rawData = fs.readFileSync(PLAYER_HISTORY_FILE, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error loading player history:', error);
        return [];
    }
}

function savePlayerHistory(data) {
    try {
        fs.writeFileSync(PLAYER_HISTORY_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving player history:', error);
    }
}

// --- RUN IT BACK DATA MANAGEMENT ---

function loadRIBMatchCards() {
    try {
        if (!fs.existsSync(RIB_MATCH_CARDS_FILE)) throw new Error('File does not exist');
        const rawData = fs.readFileSync(RIB_MATCH_CARDS_FILE, 'utf8');
        if (!rawData.trim()) throw new Error('File is empty');
        return JSON.parse(rawData);
    } catch (error) {
        console.log('Creating new Run It Back match cards file...');
        const defaultData = {
            eventTitle: "THE RUNBACK",
            eventSubtitle: "THE FINAL CHAPTER",
            partNumber: "01",
            mainEvent: { p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
            matches: [],
            singleMatch: { matchTitle: "", format: "", p1Name: "", p1Title: "", p1Character: "", p2Name: "", p2Title: "", p2Character: "" },
            sponsors: { presenter: "", association: "" }
        };
        saveRIBMatchCards(defaultData);
        return defaultData;
    }
}

function saveRIBMatchCards(data) {
    try {
        fs.writeFileSync(RIB_MATCH_CARDS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving RIB match cards:', error);
    }
}

function loadRIBPlayerStats() {
    try {
        if (!fs.existsSync(RIB_PLAYER_STATS_FILE)) throw new Error('File does not exist');
        const rawData = fs.readFileSync(RIB_PLAYER_STATS_FILE, 'utf8');
        if (!rawData.trim()) throw new Error('File is empty');
        return JSON.parse(rawData);
    } catch (error) {
        console.log('Creating new Run It Back player stats file...');
        const defaultData = { players: [] };
        saveRIBPlayerStats(defaultData);
        return defaultData;
    }
}

function saveRIBPlayerStats(data) {
    try {
        fs.writeFileSync(RIB_PLAYER_STATS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving RIB player stats:', error);
    }
}

function loadRIBStreamData() {
    try {
        if (!fs.existsSync(RIB_STREAM_DATA_FILE)) throw new Error('File does not exist');
        const rawData = fs.readFileSync(RIB_STREAM_DATA_FILE, 'utf8');
        if (!rawData.trim()) throw new Error('File is empty');
        return JSON.parse(rawData);
    } catch (error) {
        console.log('Creating new Run It Back stream data file...');
        const defaultData = { matchTitle: "", p1Name: "", p1Flag: "", p1Score: 0, p2Name: "", p2Flag: "", p2Score: 0 };
        saveRIBStreamData(defaultData);
        return defaultData;
    }
}

function saveRIBStreamData(data) {
    try {
        fs.writeFileSync(RIB_STREAM_DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving RIB stream data:', error);
    }
}

// Load initial state
let overlayData = loadData();
let tagTeamData = loadTagTeamData();
let playerHistory = loadPlayerHistory();
let ribMatchCards = loadRIBMatchCards();
let ribPlayerStats = loadRIBPlayerStats();
let ribStreamData = loadRIBStreamData();

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

app.get('/api/history', (req, res) => {
    res.status(200).json(playerHistory);
});

app.post('/api/history', (req, res) => {
    const newPlayers = req.body; // Expecting an array of players
    let updated = false;

    newPlayers.forEach(player => {
        if (!player.name) return; // Skip if no name
        const existingIndex = playerHistory.findIndex(p => p.name === player.name);
        if (existingIndex > -1) {
            // Update existing player
            playerHistory[existingIndex] = { ...playerHistory[existingIndex], ...player };
        } else {
            // Add new player
            playerHistory.push(player);
        }
        updated = true;
    });
    
    if (updated) {
        savePlayerHistory(playerHistory);
    }
    
    res.status(200).json(playerHistory);
});

app.delete('/api/history', (req, res) => {
    const { name } = req.body;
    const initialLength = playerHistory.length;
    playerHistory = playerHistory.filter(p => p.name !== name);

    if (playerHistory.length < initialLength) {
        savePlayerHistory(playerHistory);
        res.status(200).json({ success: true, message: 'Player deleted.' });
    } else {
        res.status(404).json({ success: false, message: 'Player not found.' });
    }
});

// --- RUN IT BACK API ROUTES ---

app.get('/api/rib/match-cards', (req, res) => {
    res.status(200).json(ribMatchCards);
});

app.post('/api/rib/match-cards', (req, res) => {
    ribMatchCards = req.body;
    saveRIBMatchCards(ribMatchCards);
    io.emit('rib-match-cards-update', ribMatchCards);
    res.status(200).json(ribMatchCards);
});

app.get('/api/rib/player-stats', (req, res) => {
    res.status(200).json(ribPlayerStats);
});

app.post('/api/rib/player-stats', (req, res) => {
    ribPlayerStats = req.body;
    saveRIBPlayerStats(ribPlayerStats);
    io.emit('rib-player-stats-update', ribPlayerStats);
    res.status(200).json(ribPlayerStats);
});

app.get('/api/rib/stream-data', (req, res) => {
    res.status(200).json(ribStreamData);
});

app.post('/api/rib/stream-data', (req, res) => {
    ribStreamData = req.body;
    saveRIBStreamData(ribStreamData);
    io.emit('rib-stream-data-update', ribStreamData);
    res.status(200).json(ribStreamData);
});

app.get('/api/rib/overlay-state', (req, res) => {
    res.status(200).json(ribOverlayState);
});

app.post('/api/rib/overlay-state', (req, res) => {
    ribOverlayState = { ...ribOverlayState, ...req.body };
    io.emit('rib-overlay-state-update', ribOverlayState);
    res.status(200).json(ribOverlayState);
});


// --- SOCKET.IO ---

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === CONNECTION_KEY) next();
  else next(new Error('Invalid connection key'));
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current state immediately on connection
  socket.emit('data-update', overlayData);
  socket.emit('tag-team-data', tagTeamData);
  
  // Send Run It Back state
  socket.emit('rib-match-cards-update', ribMatchCards);
  socket.emit('rib-player-stats-update', ribPlayerStats);
  socket.emit('rib-stream-data-update', ribStreamData);
  socket.emit('rib-overlay-state-update', ribOverlayState);

  // Handle 1v1 Updates
  socket.on('update-data', (data) => {
    overlayData = data;
    saveData(overlayData);

    // Also update player history from socket updates
    const playersToSave = [
        { name: data.p1Name, team: data.p1Team, flag: data.p1Flag },
        { name: data.p2Name, team: data.p2Team, flag: data.p2Flag },
    ].filter(p => p.name); // Only save players with names

    if (playersToSave.length > 0) {
        playersToSave.forEach(player => {
            const existingIndex = playerHistory.findIndex(p => p.name === player.name);
            if (existingIndex > -1) {
                playerHistory[existingIndex] = { ...playerHistory[existingIndex], ...player };
            } else {
                playerHistory.push(player);
            }
        });
        savePlayerHistory(playerHistory);
        // Inform all clients about the history update
        io.emit('history-update', playerHistory);
    }

    io.emit('data-update', overlayData);
  });

  // Handle Tag Team Updates
  socket.on('tag-team-update', (data) => {
    console.log('Received Tag Team Update');
    tagTeamData = data;
    saveTagTeamData(tagTeamData);
    io.emit('tag-team-data', tagTeamData);
  });

  // Handle Run It Back Updates
  socket.on('rib-match-cards-update', (data) => {
    console.log('Received RIB Match Cards Update');
    ribMatchCards = data;
    saveRIBMatchCards(ribMatchCards);
    io.emit('rib-match-cards-update', ribMatchCards);
  });

  socket.on('rib-player-stats-update', (data) => {
    console.log('Received RIB Player Stats Update');
    ribPlayerStats = data;
    saveRIBPlayerStats(ribPlayerStats);
    io.emit('rib-player-stats-update', ribPlayerStats);
  });

  socket.on('rib-stream-data-update', (data) => {
    console.log('Received RIB Stream Data Update');
    ribStreamData = data;
    saveRIBStreamData(ribStreamData);
    io.emit('rib-stream-data-update', ribStreamData);
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