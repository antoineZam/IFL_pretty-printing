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
const DATA_FILE = path.join(SOURCE_DIR, 'data.json');
const TAG_TEAM_FILE = path.join(SOURCE_DIR, 'tag-team-data.json');
const PLAYER_HISTORY_FILE = path.join(SOURCE_DIR, 'player-history.json');

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

// Load initial state
let overlayData = loadData();
let tagTeamData = loadTagTeamData();
let playerHistory = loadPlayerHistory();

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
});

// Catch-all to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


server.listen(port, () => {
  console.log(`\nServer running at http://localhost:${port}`);
  console.log(`Login with key: ${CONNECTION_KEY}`);
});