"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ChampionStatsProps {
  champions: Array<{
    championName: string;
    gamesPlayed: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
  }>;
}

export function ChampionStatsChart({ champions }: ChampionStatsProps) {
  const data = champions.map(champ => ({
    name: champ.championName,
    winRate: ((champ.wins / champ.gamesPlayed) * 100).toFixed(1),
    kda: ((champ.kills + champ.assists) / Math.max(1, champ.deaths)).toFixed(2),
    games: champ.gamesPlayed
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Champion Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              tick={{ fontSize: 12 }}
              label={{ value: 'Win Rate %', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              tick={{ fontSize: 12 }}
              label={{ value: 'KDA', angle: 90, position: 'insideRight' }}
            />
            <Tooltip />
            <Bar yAxisId="left" dataKey="winRate" fill="#8884d8" name="Win Rate %" />
            <Bar yAxisId="right" dataKey="kda" fill="#82ca9d" name="KDA" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}