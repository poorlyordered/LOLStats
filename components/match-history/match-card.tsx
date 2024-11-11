'use client';

import { formatDistanceToNow } from 'date-fns';
import { Match, MatchParticipant } from '@/lib/api/types';
import { Card } from '@/components/ui/card';
import { Trophy, Skull } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  summonerPuuid: string;
}

export function MatchCard({ match, summonerPuuid }: MatchCardProps) {
  const participant = match.info.participants.find(
    (p) => p.puuid === summonerPuuid
  )!;

  const kda = ((participant.kills + participant.assists) / Math.max(participant.deaths, 1)).toFixed(2);
  const duration = Math.floor(match.info.gameDuration / 60);
  const createdAt = new Date(match.info.gameCreation);

  return (
    <Card className={`p-4 ${participant.win ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`}
              alt={participant.championName}
              className="w-16 h-16 rounded-lg"
            />
            {participant.win ? (
              <Trophy className="absolute -top-2 -right-2 w-6 h-6 text-green-500" />
            ) : (
              <Skull className="absolute -top-2 -right-2 w-6 h-6 text-red-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{participant.championName}</h3>
            <p className="text-sm text-muted-foreground">
              {match.info.gameMode} • {duration}m • {formatDistanceToNow(createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">
            {participant.kills}/{participant.deaths}/{participant.assists}
          </p>
          <p className="text-sm text-muted-foreground">{kda} KDA</p>
        </div>
      </div>
    </Card>
  );
}