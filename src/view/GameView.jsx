import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Gamepad2,
  LayoutDashboard,
  History as HistoryIcon,
} from "lucide-react";
import TileCard from "../components/TileCard";
import GameStats from "../components/GameStats";
import GameControls from "../components/GameControls";
import HistoryPanel from "../components/HistoryPanel";
import GameOverModal from "../components/GameOverModal";
import useGame from "../hook/useGame";
import { getLeaderboard } from "../utils/storage";

export default function GameView({ setScreen, setLeaderboard }) {
  const game = useGame(setLeaderboard);

  // Game entry sound
  useEffect(() => {
    const audio = new Audio("/card-dealing.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Game sound prevented"));
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const saved = getLeaderboard();
    setLeaderboard(saved);
    game.initGame();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 md:p-8 text-white font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
            <Gamepad2 className="text-emerald-400 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Mahjong Royale
          </h1>
        </div>

        <button
          onClick={() => setScreen("home")}
          className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Menu</span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats */}
        <motion.aside
          className="lg:col-span-3 space-y-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-xs font-bold tracking-widest">
                <LayoutDashboard className="w-4 h-4" />
                Live Stats
              </div>
              <GameStats
                score={game.score}
                combo={game.combo}
                deck={game.deck}
                discardPile={game.discardPile}
                reshuffleCount={game.reshuffleCount}
              />
            </div>
          </div>
        </motion.aside>

        {/* Center Column: Game Board */}
        <motion.section
          className="lg:col-span-6 flex flex-col items-center justify-center min-h-[400px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Hand Area */}
          <div className="relative w-full flex justify-center py-12 px-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl mb-8">
            <div className="absolute top-0 -translate-y-1/2 bg-slate-800 border border-slate-700 px-4 py-1 rounded-full text-xs font-semibold text-emerald-400">
              CURRENT HAND
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <AnimatePresence mode="popLayout">
                {game.currentHand.map((tile, i) => (
                  <motion.div
                    key={tile.id}
                    layout
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ y: -10 }}
                  >
                    <TileCard
                      tile={tile}
                      index={i}
                      tileValues={game.tileValues}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <GameControls onBet={game.handleBet} disabled={game.showGameOver} />
        </motion.section>

        {/* Right Column: History */}
        <motion.aside
          className="lg:col-span-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl h-full max-h-[600px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-xs font-bold tracking-widest">
              <HistoryIcon className="w-4 h-4" />
              Game history
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <HistoryPanel history={game.history} />
            </div>
          </div>
        </motion.aside>
      </main>

      {/* Game Over Modal */}
      <AnimatePresence>
        {game.showGameOver && (
          <GameOverModal
            score={game.score}
            onRestart={game.initGame}
            onHome={() => setScreen("home")}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
