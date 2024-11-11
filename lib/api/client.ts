import { API_CONFIG } from './config';
import type { Summoner, Match, SummonerStats } from './types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response): ApiError {
    const status = response.status;
    let message = 'An unexpected error occurred';

    switch (status) {
      case 404:
        message = 'Summoner not found';
        break;
      case 429:
        message = 'Too many requests. Please try again later';
        break;
      case 500:
        message = 'Server error. Please try again later';
        break;
      default:
        message = `Request failed: ${response.statusText}`;
    }

    return new ApiError(status, message);
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw ApiError.fromResponse(response);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      'Failed to connect to the server. Please check your connection and try again.'
    );
  }
}

export const api = {
  summoner: {
    async get(name: string, region: string): Promise<Summoner> {
      if (!name.trim()) {
        throw new ApiError(400, 'Please enter a summoner name');
      }
      return fetchApi<Summoner>(
        `${API_CONFIG.endpoints.summoner}/${region}/${encodeURIComponent(name.trim())}`
      );
    },
  },

  matches: {
    async getList(puuid: string, region: string): Promise<Match[]> {
      return fetchApi<Match[]>(
        `${API_CONFIG.endpoints.matches}/${region}/${puuid}`
      );
    },

    async getById(matchId: string, region: string): Promise<Match> {
      return fetchApi<Match>(
        `${API_CONFIG.endpoints.matches}/${region}/${matchId}`
      );
    },
  },

  stats: {
    async get(puuid: string, region: string): Promise<SummonerStats> {
      return fetchApi<SummonerStats>(
        `${API_CONFIG.endpoints.stats}/${region}/${puuid}`
      );
    },
  },
};