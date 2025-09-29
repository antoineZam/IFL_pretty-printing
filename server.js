const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const dataFilePath = './source/data.json';

// Ensure the source directory exists
if (!fs.existsSync('./source')) {
  fs.mkdirSync('./source', { recursive: true });
}


function loadData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    if (data.trim() === '') {
      throw new Error('File is empty');
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading data:', error);
    const defaultData = {
      p1Team: 'Team 1',
      p1Name: 'Player 1',
      p2Team: 'Team 2',
      p2Name: 'Player 2',
      p1Score: 0,
      p2Score: 0,
      round: 'Winners Round 1'
    };
    // Save default data to file
    saveData(defaultData);
    return defaultData;
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    console.log('Data saved successfully to', dataFilePath);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}


let overlayData = loadData();

// Serve the control panel and overlay files
app.get('/match-control', (req, res) => {
  res.sendFile(__dirname + '/match-control.html');
});

app.get('/match-overlay', (req, res) => {
  res.sendFile(__dirname + '/match-overlay.html');
});


io.on('connection', (socket) => {
  console.log('A user connected.');

  // Send the current data to newly connected clients
  socket.emit('data-update', overlayData);

  // Listen for updates from the control panel
  socket.on('update-data', (data) => {
    overlayData = data;
    saveData(overlayData);
    
    // Broadcast the new data to all clients (the overlay)
    io.emit('data-update', overlayData);
    console.log('Data updated:', overlayData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Open Control Panel at: http://localhost:${port}/match-control`);
  console.log(`Add Overlay to OBS from: http://localhost:${port}/match-overlay`);
});