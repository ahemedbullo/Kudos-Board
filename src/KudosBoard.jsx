import React, { useState, useEffect } from "react";
import KudosCard from "./KudosCard";
import "./KudosCard.css";

function KudosBoard() {
  return (
    <div>
      <div className="kudos-cards">
        <KudosCard />
      </div>
    </div>
  );
}

export default KudosBoard;
