'use client';

import { useState } from 'react';
import { Search, Shield, Sword, Activity, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSummoner } from '@/hooks/use-summoner';
import { MatchList } from '@/components/match-history/match-list';
import { ChampionStatsChart } from '@/components/stats/champion-stats';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_CONFIG } from '@/lib/api/config';

export default function Home() {
  const [summonerName, setSummonerName] = useState('Monoteam');
  const [region, setRegion] = useState('na1');
  const { summoner, matches, stats, isLoading, error, searchSummoner } = useSummoner();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchSummoner(summonerName, region);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            League Stats Explorer
          </h1>
          <p className="text-muted-foreground">
            Track your League of Legends performance and analyze your gameplay
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              placeholder="Enter summoner name..."
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
            <Select 
              value={region} 
              onValueChange={setRegion} 
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px] h-12">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {API_CONFIG.regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="h-12 px-6" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-center">
              {error.message}
            </div>
          )}
        </form>

        {summoner && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Level</h3>
                  <p className="text-2xl font-bold">{summoner.summonerLevel}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sword className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Win Rate</h3>
                  <p className="text-2xl font-bold">
                    {((stats.wins / stats.totalGames) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">KDA</h3>
                  <p className="text-2xl font-bold">{stats.averageKDA.toFixed(2)}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="matches">
              <History className="mr-2 h-4 w-4" />
              Match History
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Activity className="mr-2 h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="matches">
            <Card className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : summoner && matches.length > 0 ? (
                <MatchList matches={matches} summonerPuuid={summoner.puuid} />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  Search for a summoner to view their match history
                </div>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : stats ? (
                <ChampionStatsChart champions={stats.mostPlayedChampions} />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  Search for a summoner to view their statistics
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}