import React from "react";
import { useNavigate } from "react-router-dom";
import "./KudosCard.css";

function KudosCard({ board, image, onViewBoard, onDelete }) {
  return (
    <div className="kudos-card">
      <img
        src={`https://picsum.photos/200/300?random=${image}`}
        alt=""
        className="Kudos-card-img"
      />
      <div>
        <p>{board.title}</p>
        <p>{board.author}</p>
        <p>{board.category}</p>
        <div className="cardButtons">
          <button className="viewBoard" onClick={onViewBoard}>
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
