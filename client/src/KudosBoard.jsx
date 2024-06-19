import React, { useState, useEffect } from "react";
import KudosCard from "./KudosCard";
import "./KudosBoard.css";

function KudosBoard() {
  return (
    <div>
      <div className="kudos-cards">
        <KudosCard />
        <KudosCard />
        <KudosCard />
        <KudosCard />
        <KudosCard />
        <KudosCard />
        <KudosCard />
      </div>
    </div>
  );
}

export default KudosBoard;
