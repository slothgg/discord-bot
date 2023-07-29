import { Role } from './enum';

export interface GetUserResponse {
  user: {
    id: number;
    username: string;
    role: Role;
    clanWarId: number;
    clanId: number;
  };
  clan?: {
    id: number;
    clanId: number;
    clanTag: string;
    clanName: string;
    color: string;
    memberCount: number;
    motto: string;
    leader: string;
    description: string;
    emblemUrl: string;
  };
  rating: {
    data: {
      id: number;
      createdAt: string;
      updatedAt: string;
      userId: number;
      wn8: string;
      winRate: string;
      battleCount: number;
    };
    compareWN8?: string;
    compareWinRate?: string;
    compareBattleCount?: string;
  };
}
