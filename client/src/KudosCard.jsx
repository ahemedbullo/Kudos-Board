import React from "react";
import { useNavigate } from "react-router-dom";
import "./KudosCard.css";

function KudosCard({ board, onDelete }) {
  const navigate = useNavigate();

  const handleViewBoard = () => {
    navigate(`/boards/${board.boardId}`);
  };

  return (
    <div className="kudos-card">
      <img src={board.image} alt="" className="" />
      <div>
        <p>{board.title}</p>
        <p>{board.author}</p>
        <p>{board.category}</p>
        <div className="cardButtons">
          <button className="viewBoard" onClick={handleViewBoard}>
            View Board
          </button>
          <button
            className="deleteBoard"
            onClick={() => onDelete(board.boardId)}
          >
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default KudosCard;
