export const calculateHandValue = (hand, tileValues = {}) => {
  if (!hand || !Array.isArray(hand)) return 0;

  return hand.reduce((total, tile) => {
    if (tile.type === "number") {
      return total + (tile.value || 0);
    } else {
      return total + (tileValues[tile.type] ?? 5);
    }
  }, 0);
};
