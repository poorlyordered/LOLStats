const RIOT_API_CONFIG = {
  baseUrl: {
    platform: (region) => `https://${region}.api.riotgames.com`,
    regional: (region) => `https://${getRegionalRoute(region)}.api.riotgames.com`,
  },
  endpoints: {
    summoner: {
      byName: '/lol/summoner/v4/summoners/by-name',
    },
    match: {
      byPuuid: '/lol/match/v5/matches/by-puuid',
      byId: '/lol/match/v5/matches',
    },
    league: {
      bySummonerId: '/lol/league/v4/entries/by-summoner',
    },
  },
  regions: {
    na1: { name: 'North America', regional: 'americas' },
    euw1: { name: 'Europe West', regional: 'europe' },
    kr: { name: 'Korea', regional: 'asia' },
    eun1: { name: 'Europe Nordic & East', regional: 'europe' },
  },
};

function getRegionalRoute(platformRegion) {
  return RIOT_API_CONFIG.regions[platformRegion]?.regional || 'americas';
}

module.exports = {
  RIOT_API_CONFIG,
  getRegionalRoute,
};