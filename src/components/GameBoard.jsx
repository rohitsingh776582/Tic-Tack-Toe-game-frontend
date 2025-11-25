import React, { useEffect, useState } from "react";
import Board from "./Board";

const HUMAN = "X";
const AI = "O";

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (let [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  return board.includes("") ? null : "Draw";
}

function emptyIndices(board) {
  return board.map((v,i) => v === "" ? i : -1).filter(i => i !== -1);
}


function aiRandom(board) {
  const empties = emptyIndices(board);
  if (empties.length === 0) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}


function aiEasy(board) {
  if (board[4] === "") return 4;
  const corners = [0,2,6,8];
  for (let c of corners) if (board[c] === "") return c;
  return aiRandom(board);
}

function findImmediate(board, player) {
  for (let line of WIN_LINES) {
    const [a,b,c] = line;
    const vals = [board[a], board[b], board[c]];
    if (vals.filter(v => v === player).length === 2 && vals.includes("")) {
      const emptyIndex = [a,b,c][vals.indexOf("")];
      return emptyIndex;
    }
  }
  return null;
}


function aiMedium(board) {
  const win = findImmediate(board, AI);
  if (win !== null) return win;
  const block = findImmediate(board, HUMAN);
  if (block !== null) return block;
  return aiEasy(board);
}

function minimax(board, player) {
  const winner = checkWinner(board);
  if (winner === HUMAN) return { score: -10 };
  if (winner === AI) return { score: 10 };
  if (winner === "Draw") return { score: 0 };

  const moves = [];
  for (let i=0;i<9;i++) {
    if (board[i] === "") {
      const move = { index: i };
      board[i] = player;
      const result = minimax(board, player === AI ? HUMAN : AI);
      move.score = result.score;
      board[i] = "";
      moves.push(move);
    }
  }

  if (player === AI) {
    let best = moves[0];
    for (let m of moves) if (m.score > best.score) best = m;
    return best;
  } else {
    let best = moves[0];
    for (let m of moves) if (m.score < best.score) best = m;
    return best;
  }
}

function aiMinimax(board, level) {
  const best = minimax([...board], AI);
  if (!best || best.index === undefined) {
    return aiRandom(board);
  }
  if (level === 5) {
    return best.index;
  }
  return best.index;
}

export default function GameBoard({ level = 1, onComplete = () => {} }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setDisabled(false);
  }, [level]);

  useEffect(() => {
    const res = checkWinner(board);
    if (res) {
      setWinner(res);
      setDisabled(true);
      onComplete(res);
    }
  }, [board]);


  const handleHumanMove = (idx) => {
    if (board[idx] !== "" || winner || disabled) return;
    const nb = [...board];
    nb[idx] = HUMAN;
    setBoard(nb);

    setTimeout(() => {
      if (checkWinner(nb)) return;
      const aiIdx = decideAIMove(nb, level);
      if (aiIdx === null || aiIdx === undefined) return;
      const nb2 = [...nb];
      nb2[aiIdx] = AI;
      setBoard(nb2);
    }, 250);
  };

  const decideAIMove = (b, lvl) => {
    if (lvl === 1) return aiRandom(b);
    if (lvl === 2) return aiEasy(b);
    if (lvl === 3) return aiMedium(b);
    if (lvl === 4) return aiMinimax(b, 4);
    if (lvl === 5) return aiMinimax(b, 5);
    return aiRandom(b);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setDisabled(false);
  };

  return (
    <div className="text-center">
      <div className="mb-2">Level {level} — <span className="italic text-sm">{levelName(level)}</span></div>
      <Board board={board} onClick={handleHumanMove} />
      <div className="mt-3">
        {winner ? (
          <div className="p-2">
            <strong>Result: </strong>
            {winner === "X" ? "You won" : winner === "O" ? "AI won" : "Draw"}
          </div>
        ) : <div className="p-2 text-sm text-gray-600">Your turn (X)</div>}
        <div className="mt-2 flex justify-center gap-2">
          <button onClick={handleReset} className="px-3 py-1 border rounded">Reset</button>
        </div>
      </div>
    </div>
  );
}

function levelName(l) {
  if (l === 1) return "Random";
  if (l === 2) return "Easy";
  if (l === 3) return "Medium";
  if (l === 4) return "Strong";
  if (l === 5) return "Impossible";
  return "Unknown";
}
