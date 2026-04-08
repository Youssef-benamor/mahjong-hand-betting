export default function GameOverModal({ score, onRestart, onHome }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-2xl text-center space-y-4">
        <h2 className="text-2xl text-red-500 font-bold">Game Over</h2>

        <p>Final Score: {score}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Play Again
          </button>

          <button onClick={onHome} className="bg-blue-500 px-4 py-2 rounded">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
