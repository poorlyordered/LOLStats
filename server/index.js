require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const riotApi = require('./services/riot-api');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/api/summoner/:name', async (req, res) => {
  try {
    const summoner = await riotApi.getSummonerByName(req.params.name);
    res.json(summoner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/matches/:puuid', async (req, res) => {
  try {
    const { start = 0, count = 20 } = req.query;
    const matches = await riotApi.getMatchHistory(req.params.puuid, parseInt(start), parseInt(count));
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/match/:matchId', async (req, res) => {
  try {
    const match = await riotApi.getMatchDetails(req.params.matchId);
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});