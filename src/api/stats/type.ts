import { GetRecentStatsUserData } from '../user/type';

export interface GetStatsResponse {
  rating: Rating;
  compareWN8?: string;
  compareWinRate?: string;
  compareBattleCount?: string;
}

export interface Rating {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  wn8: string;
  winRate: string;
  battleCount: number;
}

export interface RecentStats {
  battles: number;
  tankCount: number | null;
  tier: number | null;
  wn8: number | null;
  wins: number | null;
  losses: number | null;
  draws: number | null;
  winRate: number | null;
  lossRate: number | null;
}

export interface GetRecentStatsResponse {
  user: GetRecentStatsUserData;
  rating: {
    recent24hr: RecentStats;
    recent1000battles: RecentStats;
  };
}

export class StatsData {
  rating: Rating;
  compareWN8?: string;
  compareWinRate?: string;
  compareBattleCount?: string;

  async setData(data: GetStatsResponse) {
    this.rating = data.rating;
    this.compareWN8 = data.compareWN8;
    this.compareWinRate = data.compareWinRate;
    this.compareBattleCount = data.compareBattleCount;
  }
}

export class RecentStatsData {
  recent1000Stats: RecentStats;
  recent24hrStats: RecentStats;

  async setThousandData(data: GetRecentStatsResponse) {
    this.recent1000Stats = data.rating.recent1000battles;
  }

  async setTwentyFourHourData(data: GetRecentStatsResponse) {
    this.recent24hrStats = data.rating.recent24hr;
  }
}
