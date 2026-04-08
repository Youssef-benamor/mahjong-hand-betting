export const updateTileValues = (hand, result) => {
  return hand.map((tile) => {
    if (tile.type === "number") return tile;

    let newValue = tile.value;

    if (result === "win") {
      newValue += 1;
    } else {
      newValue -= 1;
    }

    // clamp values
    if (newValue < 1) newValue = 1;
    if (newValue > 9) newValue = 9;

    return {
      ...tile,
      value: newValue,
    };
  });
};
