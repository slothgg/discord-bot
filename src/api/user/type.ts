import { Role } from './enum';

export interface GetUserResponse {
  id: number;
  username: string;
  role: Role;
  userWarId: number;
  clanWarId: number;
  clanId: number;
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

export class UserData {
  id: number;
  username: string;
  role: Role;
  userWarId: number;
  clanWarId: number;
  clanId: number;

  set(user: GetUserResponse) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
    this.userWarId = user.userWarId;
    this.clanWarId = user.clanWarId;
    this.clanId = user.clanId;
  }
}
