import React from "react";
import './KudosCard.css';

function KudosCard() {
  return (
    <div className="kudos-card">
      <img src="" alt="there is an image here" className="" />
      <div>
        <p>title</p>
        <p>author</p>
        <p>category</p>
        <div className="cardButtons">
          <button className="viewBoard"> View Board</button>
          <button className="deleteBoard" onClick>
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default KudosCard;
