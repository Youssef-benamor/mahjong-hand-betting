import { useState, useEffect } from "react";
import GameView from "./view/GameView";
import Home from "./components/home";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [leaderboard, setLeaderboard] = useState([]);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("leaderboard");
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  return (
    <div>
      {screen === "home" && (
        <Home setScreen={setScreen} leaderboard={leaderboard} />
      )}

      {screen === "game" && (
        <GameView
          setScreen={setScreen}
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
        />
      )}
    </div>
  );
}
