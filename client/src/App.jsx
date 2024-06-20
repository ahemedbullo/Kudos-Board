import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./Search.jsx";
import KudosBoard from "./KudosBoard.jsx";
import Modal from "./Modal.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);

  const handleCreateBoardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateBoard = async (boardData) => {
    try {
      const response = await fetch("http://localhost:3000/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boardData),
      });
      if (!response.ok) {
        throw new Error("HandleCreateBoard Error");
      }
      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      handleCloseModal();
    } catch (error) {
      console.error("Error Creating board: ", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(`http://localhost:3000/boards/${boardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete nor responding correctly");
      }

      setBoards(boards.filter((board) => board.boardId != boardId));
    } catch (error) {
      console.error("Error deleting board", error);
    }
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
        <div className="kudos-boards">
          <KudosBoard boards={boards} onDeleteBoard={handleDeleteBoard} />
        </div>
      </div>
      <div>
        {showModal && (
          <Modal onClose={handleCloseModal} onSumbit={handleCreateBoard} />
        )}
      </div>
    </div>
  );
}

export default App;
