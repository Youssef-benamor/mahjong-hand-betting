import { useState, useEffect } from "react";

export default function Home({ setScreen, leaderboard, setLeaderboard }) {
  const [showRules, setShowRules] = useState(false);

  // Sound on home
  useEffect(() => {
    const audio = new Audio("/home.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Home sound prevented"));
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mahjongLeaderboard");
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, [setLeaderboard]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col items-center">
      {/* TITLE */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-wide">
        🀄 Mahjong Hand Betting
      </h1>

      <p className="text-gray-400 text-center max-w-xl mb-10">
        A fast-paced card betting game where strategy meets luck 🎲
      </p>

      {/* PLAY BUTTON */}
      <button
        onClick={() => setScreen("game")}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-2xl text-xl shadow-2xl transition transform hover:scale-105 mb-12"
      >
        ▶️ Play Game
      </button>

      {/* LEADERBOARD */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-xl mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          🏆 Top Scores
        </h2>

        {leaderboard.length === 0 ? (
          <p className="text-gray-400 text-center italic">No scores yet</p>
        ) : (
          <ol className="space-y-2">
            {leaderboard.map((score, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-700 p-3 rounded-lg"
              >
                <span>#{index + 1}</span>
                <span className="font-bold text-green-400">{score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* RULES */}
      <button
        onClick={() => setShowRules(!showRules)}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition"
      >
        📜 {showRules ? "Hide Rules" : "Show Rules"}
      </button>

      {showRules && (
        <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4">📜 Game Rules</h3>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>You start with a hand of 5 tiles 🀄</li>
            <li>
              Choose <strong>Higher</strong> or <strong>Lower</strong>
            </li>
            <li>
              Correct = <strong>+10 points</strong>
            </li>
            <li>
              Wrong = <strong>-5 points</strong>
            </li>
            <li>Tiles Dragon or Wind start at 5 points</li>
            <li>Tiles 1-9 start at 1 point</li>
            <li>
              Winds and Dragons can increase or decrease -1 depending on win or
              lose rounds
            </li>
            <li>Build combos 🔥</li>
            <li>Deck auto-reshuffles (max 3 times)</li>
            <li>
              Game ends after 3 reshuffles or winds or dragon value reach 10 or
              0
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
