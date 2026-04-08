import { useState } from "react";
import { createDeck } from "../game/deck";
import { shuffleDeck } from "../game/shuffle";
import { playTurn } from "../game/engine";
import { getLeaderboard, saveLeaderboard } from "../utils/storage";

export default function useGame(setLeaderboard) {
  const [currentHand, setCurrentHand] = useState([]);
  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [tileValues, setTileValues] = useState({
    wind: 5,
    dragon: 5,
    number: {},
  });
  const [reshuffleCount, setReshuffleCount] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);

  // ✅ initialize game
  const initGame = () => {
    const newDeck = shuffleDeck(createDeck());

    setCurrentHand(newDeck.slice(0, 5));
    setDeck(newDeck.slice(5));
    setDiscardPile([]);
    setHistory([]);
    setScore(0);
    setCombo(0);
    setTileValues({});
    setReshuffleCount(0);
    setShowGameOver(false);
  };

  // ✅ leaderboard
  const updateLeaderboard = (newScore) => {
    const saved = getLeaderboard();

    const updated = [...saved, newScore].sort((a, b) => b - a).slice(0, 5);

    setLeaderboard(updated);
    saveLeaderboard(updated);
  };

  // ✅ BET LOGIC
  const handleBet = (bet) => {
    if (showGameOver) return;

    let workingDeck = [...deck];

    // 🔁 RESHUFFLE
    if (workingDeck.length < 5 && discardPile.length > 0) {
      if (reshuffleCount >= 3) {
        setShowGameOver(true);
        updateLeaderboard(score);
        return;
      }

      const newDeck = shuffleDeck([...discardPile]);

      setDeck(newDeck);
      setDiscardPile([]);
      setReshuffleCount((prev) => prev + 1);

      workingDeck = newDeck;
    }

    const handSnapshot = [...currentHand];

    const nextHand = workingDeck.slice(0, 5);
    const remainingDeck = workingDeck.slice(5);

    const resultData = playTurn(handSnapshot, nextHand, bet, tileValues);

    setCurrentHand(resultData.newCurrentHand);
    setDeck(remainingDeck);
    setDiscardPile((prev) => [...prev, ...handSnapshot]);
    setTileValues(resultData.newTileValues);

    const isWin = resultData.isWin;
    const scoreChange = isWin ? 10 : -5;

    setScore((prev) => {
      const newScore = prev + scoreChange;

      if (resultData.gameOverByTile) {
        updateLeaderboard(newScore);
      }

      return newScore;
    });

    setCombo((prev) => (isWin ? prev + 1 : 0));

    setHistory((prev) => [
      ...prev,
      {
        cards: handSnapshot,
        result: isWin ? "win" : "lose",
        score: score + scoreChange,
      },
    ]);

    if (resultData.gameOverByTile) {
      setShowGameOver(true);
    }
  };

  return {
    currentHand,
    deck,
    discardPile,
    history,
    score,
    combo,
    tileValues,
    reshuffleCount,
    showGameOver,
    handleBet,
    initGame,
    setShowGameOver,
  };
}
