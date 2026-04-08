import { motion } from "framer-motion";

export default function TileCard({ tile, index, tileValues }) {
  const displayValue =
    tile.type === "number" ? tile.value : (tileValues?.[tile.type] ?? 5);

  return (
    <motion.div
      className="w-16 h-24 sm:w-20 sm:h-28 perspective tile-glow hover:rotate-Y-180"
      initial={{ y: -120, opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <div
        className={`w-full h-full rounded-lg flex flex-col items-center justify-center shadow-lg text-xs
        ${
          tile.type === "dragon"
            ? "bg-red-500 text-white"
            : tile.type === "wind"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
        }`}
      >
        {/* TYPE */}
        <span className="capitalize">{tile.type}</span>

        {/* VALUE */}
        <span className="text-lg font-bold">{displayValue}</span>
      </div>
    </motion.div>
  );
}
