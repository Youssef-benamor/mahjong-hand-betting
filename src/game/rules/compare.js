import { calculateHandValue } from "./calculate";

export const compareHands = (currentHand, nextHand, bet) => {
  const currentValue = calculateHandValue(currentHand);
  const nextValue = calculateHandValue(nextHand);

  if (bet === "higher") {
    return nextValue > currentValue ? "win" : "lose";
  }

  if (bet === "lower") {
    return nextValue < currentValue ? "win" : "lose";
  }

  return "lose";
};
