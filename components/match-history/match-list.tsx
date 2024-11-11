'use client';

import { Match } from '@/lib/api/types';
import { MatchCard } from './match-card';

interface MatchListProps {
  matches: Match[];
  summonerPuuid: string;
}

export function MatchList({ matches, summonerPuuid }: MatchListProps) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard
          key={match.metadata.matchId}
          match={match}
          summonerPuuid={summonerPuuid}
        />
      ))}
    </div>
  );
}