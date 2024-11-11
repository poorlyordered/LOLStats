const mockData = {
  summoner: {
    id: "mock-summoner-id",
    accountId: "mock-account-id",
    puuid: "mock-puuid",
    name: "Monoteam",
    profileIconId: 4644,
    summonerLevel: 375,
    region: "na1"
  },
  matches: [
    {
      metadata: {
        matchId: "NA1_1234567",
        participants: ["mock-puuid"]
      },
      info: {
        gameCreation: Date.now() - 3600000,
        gameDuration: 2100,
        gameMode: "CLASSIC",
        participants: [
          {
            puuid: "mock-puuid",
            summonerName: "Monoteam",
            championId: 266,
            championName: "Aatrox",
            kills: 8,
            deaths: 4,
            assists: 6,
            win: true,
            teamId: 100,
            totalDamageDealt: 150000,
            goldEarned: 12500,
            item0: 3153,
            item1: 3071,
            item2: 3047,
            item3: 3156,
            item4: 3026,
            item5: 3363,
            item6: 0
          }
        ]
      }
    },
    {
      metadata: {
        matchId: "NA1_1234568",
        participants: ["mock-puuid"]
      },
      info: {
        gameCreation: Date.now() - 7200000,
        gameDuration: 1800,
        gameMode: "CLASSIC",
        participants: [
          {
            puuid: "mock-puuid",
            summonerName: "Monoteam",
            championId: 245,
            championName: "Ekko",
            kills: 12,
            deaths: 6,
            assists: 7,
            win: false,
            teamId: 200,
            totalDamageDealt: 180000,
            goldEarned: 14000,
            item0: 3152,
            item1: 3157,
            item2: 3020,
            item3: 3089,
            item4: 3165,
            item5: 3364,
            item6: 0
          }
        ]
      }
    }
  ],
  stats: {
    wins: 15,
    losses: 10,
    totalGames: 25,
    averageKDA: 3.5,
    mostPlayedChampions: [
      {
        championId: 266,
        championName: "Aatrox",
        gamesPlayed: 10,
        wins: 7,
        kills: 80,
        deaths: 40,
        assists: 60
      },
      {
        championId: 245,
        championName: "Ekko",
        gamesPlayed: 8,
        wins: 5,
        kills: 96,
        deaths: 48,
        assists: 56
      },
      {
        championId: 236,
        championName: "Lucian",
        gamesPlayed: 7,
        wins: 3,
        kills: 70,
        deaths: 35,
        assists: 49
      }
    ]
  }
};

module.exports = mockData;