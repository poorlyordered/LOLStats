export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  region: string;
}

export interface Match {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: MatchParticipant[];
  };
}

export interface MatchParticipant {
  puuid: string;
  summonerName: string;
  championId: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  teamId: number;
  totalDamageDealt: number;
  goldEarned: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export interface SummonerStats {
  wins: number;
  losses: number;
  totalGames: number;
  averageKDA: number;
  mostPlayedChampions: ChampionStats[];
}

export interface ChampionStats {
  championId: number;
  championName: string;
  gamesPlayed: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
}