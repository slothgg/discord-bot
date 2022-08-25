import { Role } from './enum';

export interface GetUserResponse {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    userWarId: string;
    username: string;
    role: Role;
    clanWarId: number;
    clanId: number;
  };
  clan?: {
    id: number;
    createdAt: string;
    updatedAt: string;
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
    id: 75;
    createdAt: string;
    updatedAt: string;
    userId: number;
    wn8: string;
    winRate: string;
  };
}
