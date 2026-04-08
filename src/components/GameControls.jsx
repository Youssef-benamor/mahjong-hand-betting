import { motion } from "framer-motion";

export default function GameControls({ onBet, disabled }) {
  return (
    <div className="flex gap-4 mt-6">
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onBet("higher")}
        disabled={disabled}
        className="panel btn bg-gradient-to-r from-green-500 to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-xl"
      >
        ↑ Higher
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onBet("lower")}
        disabled={disabled}
        className="panel btn bg-gradient-to-r from-red-500 to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-xl"
      >
        ↓ Lower
      </motion.button>
    </div>
  );
}
