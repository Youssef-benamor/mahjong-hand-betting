import { shuffleDeck } from "./shuffle";

const TYPES = ["number", "wind", "dragon"];

export const createDeck = () => {
  const deck = [];

  for (let i = 0; i < 54; i++) {
    const type = TYPES[i % TYPES.length];

    let value = type === "number" ? (i % 9) + 1 : 5;

    deck.push({
      id: `tile-${i}-${Math.random()}`, // ✅ unique ID FIX
      type,
      value,
    });
  }

  return shuffleDeck(deck);
};
