import React, { useState, useEffect } from "react";
import KudosCard from "./KudosCard";
import "./KudosBoard.css";

function KudosBoard({ boards, onDeleteBoard }) {
  return (
    <div>
      <div className="kudos-cards">
        {boards.map((board) => (
          <KudosCard
            key={board.boardId}
            board={board}
            onDelete={onDeleteBoard}
          />
        ))}
      </div>
    </div>
  );
}

export default KudosBoard;
