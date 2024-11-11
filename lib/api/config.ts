export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  apiKey: process.env.RIOT_API_KEY,
  endpoints: {
    summoner: '/summoner',
    matches: '/matches',
    stats: '/stats',
  },
  regions: [
    { id: 'na1', name: 'North America' },
    { id: 'euw1', name: 'Europe West' },
    { id: 'kr', name: 'Korea' },
    { id: 'eun1', name: 'Europe Nordic & East' },
  ],
} as const;