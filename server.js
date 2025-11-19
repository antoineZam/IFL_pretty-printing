const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

// Set default connection key
const CONNECTION_KEY = process.env.CONNECTION_KEY;
console.log('Connection key:', CONNECTION_KEY);

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define absolute paths for safety
const SOURCE_DIR = path.join(__dirname, 'source');
const DATA_FILE = path.join(SOURCE_DIR, 'data.json');
const TAG_TEAM_FILE = path.join(SOURCE_DIR, 'tag-team-data.json');

// Serve static files
app.use('/source', express.static(SOURCE_DIR));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Load initial state
let overlayData = loadData();
let tagTeamData = loadTagTeamData();

// --- ROUTES ---

// Authentication
function requireAuth(req, res, next) {
  const authKey = req.query.key || req.body.key;
  if (authKey === CONNECTION_KEY) next();
  else res.redirect('/auth.html');
}

app.get('/auth.html', (req, res) => res.sendFile(path.join(__dirname, 'auth.html')));

app.post('/auth', (req, res) => {
  if (req.body.key === CONNECTION_KEY) res.redirect(`/?key=${req.body.key}`);
  else res.redirect('/auth.html?error=1');
});

app.get('/', requireAuth, (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 1v1 Routes
app.get('/ifl/match-control.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'ifl/match-control.html'));
});
app.get('/ifl/match-overlay.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'ifl/match-overlay.html'));
});

// Tag Team Routes
app.get('/tag_tournament/tag-team-control.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'tag_tournament/tag-team-control.html'));
});
app.get('/tag_tournament/tag-team-overlay.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'tag_tournament/tag-team-overlay.html'));
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

server.listen(port, () => {
  console.log(`\nServer running at http://localhost:${port}`);
  console.log(`Login with key: ${CONNECTION_KEY}`);
});