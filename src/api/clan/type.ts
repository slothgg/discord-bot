export interface GetClanResponse {
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
}

export class ClanData {
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

  async setData(data: GetClanResponse) {
    this.id = data.id;
    this.clanId = data.clanId;
    this.clanTag = data.clanTag;
    this.clanName = data.clanName;
    this.color = data.color;
    this.memberCount = data.memberCount;
    this.motto = data.motto;
    this.leader = data.leader;
    this.description = data.description;
    this.emblemUrl = data.emblemUrl;
  }
}
