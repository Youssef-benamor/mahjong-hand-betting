export default function HistoryPanel({ history }) {
  return (
    <div className="space-y-4 bg-gray-800 p-5 rounded-2xl max-h-96 overflow-y-auto">
      <h2 className="font-bold">📜 History</h2>

      {history.slice(-5).map((entry, i) => (
        <div key={i} className="bg-gray-700 p-3 rounded-xl">
          <div className="flex gap-2 flex-wrap mb-2">
            {(entry.cards || []).map((card) => (
              <div
                key={card.id}
                className={`w-10 h-14 flex items-center justify-center text-xs rounded
                ${
                  card.type === "dragon"
                    ? "bg-red-500 text-white"
                    : card.type === "wind"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                }`}
              >
                {card.type[0].toUpperCase()}
                <br />
                {card.value}
              </div>
            ))}
          </div>

          <p>{entry.result === "win" ? "✅ Win" : "❌ Lose"}</p>
          <p>Score: {entry.score}</p>
        </div>
      ))}
    </div>
  );
}
