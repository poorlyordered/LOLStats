const express = require('express');
const {
  validate,
  validateRegion,
  validateSummonerName,
  validateMatchCount,
} = require('../middleware/validate-request');
const riotApiService = require('../services/riot-api');
const logger = require('../utils/logger');

const router = express.Router();

router.get(
  '/summoner/:region/:summonerName',
  validate([validateRegion, validateSummonerName]),
  async (req, res, next) => {
    try {
      const { region, summonerName } = req.params;
      const summoner = await riotApiService.getSummonerByName(summonerName, region);
      res.json(summoner);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/matches/:region/:puuid',
  validate([validateRegion, validateMatchCount]),
  async (req, res, next) => {
    try {
      const { region, puuid } = req.params;
      const count = parseInt(req.query.count) || 20;
      
      const matchIds = await riotApiService.getMatchesByPuuid(puuid, region, count);
      const matches = await Promise.all(
        matchIds.map(matchId => riotApiService.getMatchById(matchId, region))
      );
      
      res.json(matches);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/stats/:region/:summonerId',
  validate([validateRegion]),
  async (req, res, next) => {
    try {
      const { region, summonerId } = req.params;
      const leagueEntries = await riotApiService.getLeagueEntries(summonerId, region);
      res.json(leagueEntries);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;