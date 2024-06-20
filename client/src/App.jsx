import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SearchBar from "./Search.jsx";
import KudosBoard from "./KudosBoard.jsx";
import Modal from "./Modal.jsx";
import Card from "./Card.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);

  const handleCreateBoardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:3000/boards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards: ", error);
      }
    };
    fetchBoards();
  }, []);

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
        console.log(
          `Error deleting board: ${response.status} ${response.statusText}`
        );
        throw new Error("Delete not responding correctly");
      }

      setBoards(boards.filter((board) => board.boardId != boardId));
    } catch (error) {
      console.error("Error deleting board", error);
    }
  };

  return (
    <Router>
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
          <Routes>
            <Route
              path="/"
              element={
                <div className="kudos-boards">
                  <KudosBoard
                    boards={boards}
                    onDeleteBoard={handleDeleteBoard}
                  />
                </div>
              }
            />
            <Route path="/boards/:boardId" element={<Card />} />
          </Routes>
        </div>
        <div>
          {showModal && (
            <Modal onClose={handleCloseModal} onSubmit={handleCreateBoard} />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
