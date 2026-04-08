import { AnimatedNumber } from "./animated-number";

export default function GameStats({
  score,
  combo,
  deck,
  discardPile,
  reshuffleCount,
}) {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl space-y-3 max-h-80 overflow-y-auto">
      <h2 className="font-bold">📊 Stats</h2>

      <p>
        Score: <AnimatedNumber value={score} />
      </p>
      <p>Combo: x{combo}</p>
      <p>Deck: {deck.length}</p>
      <p>Discard: {discardPile.length}</p>
      <p>Reshuffle: {reshuffleCount}/3</p>
    </div>
  );
}
