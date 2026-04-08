const LEADERBOARD_KEY = "mahjong_leaderboard";

export const getLeaderboard = () => {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveLeaderboard = (leaderboard) => {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
};
