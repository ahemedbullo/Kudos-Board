import React from "react";
import "./KudosCard.css";

function KudosCard({ board, onDelete }) {
  return (
    <div className="kudos-card">
      <img src={board.image} alt="" className="" />
      <div>
        <p>{board.title}</p>
        <p>{board.author}</p>
        <p>{board.category}</p>
        <div className="cardButtons">
          <button className="viewBoard"> View Board</button>
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
