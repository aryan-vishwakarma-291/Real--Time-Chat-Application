// server.js
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const WebSocket = require('ws');
const fs = require('fs');

// Step 1: Create Express App
const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', function connection(ws) {
  clients.add(ws);

  ws.on('message', function incoming(message) {
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => clients.delete(ws));
});

// Step 2: Serve React HTML + JS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.js'));
});

// Step 3: Start Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat app running at http://localhost:${PORT}`);
});
