const updateLeaderboard = (newScore) => {
  const saved = getLeaderboard();

  const updated = [...new Set([...saved, newScore])]
    .sort((a, b) => b - a)
    .slice(0, 5);

  setLeaderboard(updated);
  updateLeaderboard(updated);
};

export default updateLeaderboard;
