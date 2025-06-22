import { api } from '@/utils/axios';
import { GetRecentStatsResponse, GetStatsResponse } from './type';
import { PATHS } from './path';

export async function getStatsByUserWarId(
  userWarId: number,
): Promise<GetStatsResponse> {
  const { data } = await api.get<GetStatsResponse>(
    PATHS.getUserStats(userWarId),
  );

  return data;
}

export async function getRecentStatsByUserWarId(
  userWarId: number,
): Promise<GetRecentStatsResponse> {
  const { data } = await api.get<GetRecentStatsResponse>(
    PATHS.getUserRecentStats(userWarId),
  );

  return data;
}
