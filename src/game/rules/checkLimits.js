export const checkTileLimits = (hand) => {
  if (!Array.isArray(hand)) return false;

  return hand.some(
    (tile) =>
      tile &&
      typeof tile.value === "number" &&
      (tile.value <= 0 || tile.value >= 10),
  );
};
