import React from "react";
import { useNavigate } from "react-router-dom";
import "./KudosCard.css";

function KudosCard({ board, image, onViewBoard, onDelete }) {
  return (
    <div className="kudos-card">
      <div className="card-image-container">
        <img
          src={`https://picsum.photos/200/300?random=${image}`}
          alt=""
          className="Kudos-card-img"
        />
      </div>
      <div>
        <div className="card-details">
          <p>
            <b>Title: </b> {board.title}
          </p>
          <p>
            <b>Author: </b> {board.author}
          </p>
          <p>
            <b>Category: </b> {board.category}
          </p>
        </div>
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
