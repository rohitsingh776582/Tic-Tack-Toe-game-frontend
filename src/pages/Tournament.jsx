import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import { useNavigate } from "react-router-dom";

const TOTAL_LEVELS = 5;

export default function Tournament() {
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [lastResult, setLastResult] = useState(null);
  const [showFinal, setShowFinal] = useState(false);

  const handleComplete = (result) => {
    setLastResult(result);
    setScores((s) => {
      if (result === "X") return { ...s, player: s.player + 1 };
      if (result === "O") return { ...s, ai: s.ai + 1 };
      return { ...s, draws: s.draws + 1 };
    });
  };

  const next = () => {
    if (level < TOTAL_LEVELS) {
      setLevel((l) => l + 1);
      setLastResult(null);
    } else {
      setShowFinal(true);
    }
  };

  const resetTournament = () => {
    setLevel(1);
    setScores({ player: 0, ai: 0, draws: 0 });
    setLastResult(null);
    setShowFinal(false);
  };

  const winnerText = () => {
    if (scores.player > scores.ai) return "You (Player)";
    if (scores.ai > scores.player) return "AI";
    return "Tie";
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Tic-Tac-Toe Game
      </h1>

      <div className="w-full flex items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-bold">Tic-Tac-Toe Game</h1>

        <button
          className="text-red-500 font-semibold hover:text-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          Level:{" "}
          <span className="font-bold">
            {level} / {TOTAL_LEVELS}
          </span>
        </div>
        <div className="text-sm">
          Score — You: <span className="font-semibold">{scores.player}</span> |
          AI: <span className="font-semibold">{scores.ai}</span> | Draws:{" "}
          <span className="font-semibold">{scores.draws}</span>
        </div>
      </div>

      <div className="mb-4">
        <GameBoard
          level={level}
          onComplete={handleComplete}
          key={`level-${level}`}
        />
      </div>

      {lastResult && (
        <div className="mb-4 p-3 rounded border bg-gray-50">
          <div>
            Level Result:{" "}
            <strong>
              {lastResult === "X" ? "You" : lastResult === "O" ? "AI" : "Draw"}
            </strong>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={next}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Next
            </button>
            <button
              onClick={resetTournament}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {showFinal && (
        <div className="mt-4 p-4 rounded border bg-green-500">
          <h2 className="text-xl font-semibold">Tournament Finished</h2>
          <p className="mt-2">
            Final Score — You: <strong>{scores.player}</strong> | AI:{" "}
            <strong>{scores.ai}</strong> | Draws:{" "}
            <strong>{scores.draws}</strong>
          </p>
          <p className="mt-2">
            Winner: <strong>{winnerText()}</strong>
          </p>
          <div className="mt-3">
            <button
              onClick={resetTournament}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
