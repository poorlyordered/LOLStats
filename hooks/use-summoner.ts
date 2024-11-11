'use client';

import { useState } from 'react';
import { api, ApiError } from '@/lib/api/client';
import type { Summoner, Match, SummonerStats } from '@/lib/api/types';

interface UseSummonerResult {
  summoner: Summoner | null;
  matches: Match[];
  stats: SummonerStats | null;
  isLoading: boolean;
  error: Error | null;
  searchSummoner: (name: string, region: string) => Promise<void>;
}

export function useSummoner(): UseSummonerResult {
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<SummonerStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchSummoner = async (name: string, region: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Fetch summoner data
      const summonerData = await api.summoner.get(name, region);
      setSummoner(summonerData);

      // Fetch matches and stats in parallel
      const [matchesData, statsData] = await Promise.all([
        api.matches.getList(summonerData.puuid, region),
        api.stats.get(summonerData.puuid, region),
      ]);

      setMatches(matchesData);
      setStats(statsData);
    } catch (err) {
      const apiError = err instanceof ApiError ? err : new Error('An unexpected error occurred');
      setError(apiError);
      setSummoner(null);
      setMatches([]);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    summoner,
    matches,
    stats,
    isLoading,
    error,
    searchSummoner,
  };
}