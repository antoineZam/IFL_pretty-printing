require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const dbHelpers = require('./dbHelpers');

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