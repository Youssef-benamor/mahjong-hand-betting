let idCounter = 0;

const createTile = (type, value, name = null) => {
  return {
    id: idCounter++, // ✅ unique id
    type,
    name, // optional (east, red, etc.)
    value, // for number tiles OR fallback display
    baseValue: type === "number" ? value : 5, // ⭐ IMPORTANT
  };
};

export const createTiles = () => {
  const tiles = [];

  // 🎴 Number tiles (1–9)
  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < 4; j++) {
      tiles.push(createTile("number", i));
    }
  }

  // 🌀 Winds
  const winds = ["east", "south", "west", "north"];
  for (const wind of winds) {
    for (let i = 0; i < 4; i++) {
      tiles.push(createTile("wind", 5, wind));
    }
  }

  // 🐉 Dragons
  const dragons = ["red", "green", "white"];
  for (const dragon of dragons) {
    for (let i = 0; i < 4; i++) {
      tiles.push(createTile("dragon", 5, dragon));
    }
  }

  return tiles;
};
