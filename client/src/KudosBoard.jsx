import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KudosCard from "./KudosCard";
import "./KudosBoard.css";

function KudosBoard({ boards, onDeleteBoard }) {
  const navigate = useNavigate();

  const handleViewBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };
  return (
    <div>
      <div className="kudos-cards">
        {boards.map((board) => (
          <KudosCard
            key={board.boardId}
            board={board}
            image={Math.floor(Math.random() * 100)}
            onDelete={onDeleteBoard}
            onViewBoard={() => handleViewBoard(board.boardId)}
          />
        ))}
      </div>
    </div>
  );
}

export default KudosBoard;
