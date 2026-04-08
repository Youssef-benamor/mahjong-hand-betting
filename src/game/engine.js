import { calculateHandValue } from "./rules/calculate.js";

export const playTurn = (
  currentHand,
  nextHand,
  bet,
  currentTileValues = {},
) => {
  const currentValue = calculateHandValue(currentHand, currentTileValues);
  const nextValue = calculateHandValue(nextHand, currentTileValues);

  // 🎯 determine win
  const isWin =
    (bet === "higher" && nextValue > currentValue) ||
    (bet === "lower" && nextValue < currentValue);

  const result = isWin ? "win" : "lose";

  // ✅ copy previous values
  const newTileValues = { ...currentTileValues };

  // 🎯 count tiles by type (IMPORTANT FIX)
  const typeCounts = currentHand.reduce((acc, tile) => {
    if (tile.type === "wind" || tile.type === "dragon") {
      acc[tile.type] = (acc[tile.type] || 0) + 1;
    }
    return acc;
  }, {});

  // 🎯 apply rules per type
  Object.entries(typeCounts).forEach(([type, count]) => {
    let currentVal = newTileValues[type] ?? 5;
    let delta = isWin ? 1 : -1;

    let newVal = currentVal + delta;

    // clamp between 0 and 10
    newTileValues[type] = Math.max(0, Math.min(10, newVal));
  });

  // 🎯 GAME OVER
  const gameOverByTile = Object.values(newTileValues).some(
    (val) => val === 0 || val === 10,
  );

  return {
    result,
    isWin,
    currentValue,
    nextValue,
    newTileValues,
    gameOverByTile,
    newCurrentHand: nextHand,
  };
};
