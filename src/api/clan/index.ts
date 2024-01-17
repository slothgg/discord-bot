import { api } from '../../utils/axios';
import { GetClanResponse } from './type';
import { PATHS } from './path';

export async function getClanById(id: number): Promise<GetClanResponse> {
  const { data } = await api.get<GetClanResponse>(PATHS.getClanById(id));

  return data;
}
