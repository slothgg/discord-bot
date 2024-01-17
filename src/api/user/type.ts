import { Role } from './enum';

export interface GetUserResponse {
  id: number;
  username: string;
  role: Role;
  userWarId: number;
  clanWarId: number;
  clanId: number;
}

export interface GetRecentStatsUserData {
  username: string;
  userWarId: number;
  clanWarId: number;
}

export class UserData {
  id: number;
  username: string;
  role: Role;
  userWarId: number;
  clanWarId: number;
  clanId: number;

  set(data: GetUserResponse) {
    this.id = data.id;
    this.username = data.username;
    this.role = data.role;
    this.userWarId = data.userWarId;
    this.clanWarId = data.clanWarId;
    this.clanId = data.clanId;
  }
}
