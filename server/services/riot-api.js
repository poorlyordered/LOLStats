const axios = require('axios');

class RiotApiService {
  constructor() {
    this.apiKey = process.env.RIOT_API_KEY;
    if (!this.apiKey) {
      throw new Error('RIOT_API_KEY environment variable is required');
    }
    this.baseUrl = 'https://na1.api.riotgames.com';
  }

  async getSummonerByName(summonerName) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
        {
          headers: {
            'X-Riot-Token': this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Riot API Error: ${error.response.status} - ${error.response.data.status.message}`);
      }
      throw error;
    }
  }

  async getMatchHistory(puuid, start = 0, count = 20) {
    try {
      const response = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        {
          headers: {
            'X-Riot-Token': this.apiKey
          },
          params: {
            start,
            count
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Riot API Error: ${error.response.status} - ${error.response.data.status.message}`);
      }
      throw error;
    }
  }

  async getMatchDetails(matchId) {
    try {
      const response = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
          headers: {
            'X-Riot-Token': this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Riot API Error: ${error.response.status} - ${error.response.data.status.message}`);
      }
      throw error;
    }
  }
}

module.exports = new RiotApiService();