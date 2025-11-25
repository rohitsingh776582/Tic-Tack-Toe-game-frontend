
import React from "react";

export default function Board({ board, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-[260px] mx-auto p-3 bg-green-700 rounded-xl shadow-2xl">
      {board.map((v, i) => (

        
        <button
          key={i}
          onClick={() => onClick(i)}
          className="
            w-20 h-20 
            bg-[url('/wood-tile.jpg')] bg-cover bg-center
            rounded-lg shadow-lg 
            flex items-center justify-center
            text-4xl font-extrabold 
            text-transparent bg-clip-text
            select-none
            hover:scale-105 duration-200
          "
        >
          <span
            className={
              v === "X"
                ? "text-red-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
                : v === "O"
                ? "text-black drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
                : "text-yellow-600"
            }
          >
            {v}
          </span>
        </button>
        
      ))}

    </div>
  );
}
