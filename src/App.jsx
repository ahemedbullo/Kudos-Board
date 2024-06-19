import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./Search.jsx";
import KudosBoard from "./KudosBoard.jsx";
import Modal from "./Modal.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateBoardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="app-container">
      <header className="header">
        <h1>Kudos Board</h1>
      </header>
      <div className="content">
        <SearchBar />
        <div className="category-buttons">
          <button>All</button>
          <button>Recent</button>
          <button>Celebrations</button>
          <button>Thank You</button>
          <button>Inspiration</button>
        </div>
        <div className="create-card-btn">
          <button onClick={handleCreateBoardClick}>Create a New Board</button>
        </div>
        <KudosBoard />
      </div>
      <div>{showModal && <Modal onClose={handleCloseModal} />}</div>
    </div>
  );
}

export default App;
