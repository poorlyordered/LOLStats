const express = require('express');
const cors = require('cors');
const mockData = require('./data');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get summoner by name
app.get('/summoner/:region/:name', (req, res) => {
  const { name } = req.params;
  if (name.toLowerCase() === 'monoteam') {
    res.json(mockData.summoner);
  } else {
    res.status(404).json({ message: 'Summoner not found' });
  }
});

// Get matches by puuid
app.get('/matches/:region/:puuid', (req, res) => {
  const { puuid } = req.params;
  if (puuid === mockData.summoner.puuid) {
    res.json(mockData.matches);
  } else {
    res.status(404).json({ message: 'Matches not found' });
  }
});

// Get match by ID
app.get('/matches/:region/:matchId', (req, res) => {
  const { matchId } = req.params;
  const match = mockData.matches.find(m => m.metadata.matchId === matchId);
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ message: 'Match not found' });
  }
});

// Get stats by puuid
app.get('/stats/:region/:puuid', (req, res) => {
  const { puuid } = req.params;
  if (puuid === mockData.summoner.puuid) {
    res.json(mockData.stats);
  } else {
    res.status(404).json({ message: 'Stats not found' });
  }
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});