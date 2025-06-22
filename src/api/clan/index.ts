import { api } from '@/utils/axios';
import { GetClanResponse } from './type';
import { PATHS } from './path';

export async function getClanByClanWarId(
  clanWarId: number,
): Promise<GetClanResponse> {
  const { data } = await api.get<GetClanResponse>(
    PATHS.getClanByClanWarId(clanWarId),
  );

  return data;
}
