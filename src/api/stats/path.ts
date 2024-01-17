export const PATHS = {
  getUserStats: (userWarId: number) => `/stats?userWargamingId=${userWarId}`,
  getUserRecentStats: (userWarId: number) =>
    `/stats/recent?userWargamingId=${userWarId}`,
};
