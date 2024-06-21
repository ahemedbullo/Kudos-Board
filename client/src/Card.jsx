import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardModal from "./CardModal";
import "./Card.css";

function Card() {
  const { boardId } = useParams();
  const [board, setBoard] = useState("");
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/boards/${boardId}`);
        const data = await response.json();
        setBoard(data);
        setCards(data.cards);
      } catch (error) {
        console.error("Error getting board in Card ", error);
      }
    };
    if (boardId) fetchBoard();
  }, [boardId]);

  const handleCreateCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${boardId}/cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching boards: ", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [boardId]);

  const handleCreateCard = async (cardData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );
      if (!response.ok) {
        throw new Error("Error getting cardData");
      }
      const newCard = await response.json();
      setCards([...cards, newCard]);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating card", error);
    }
  };

  const handleDeleteCard = async (card) => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${card.boardId}/cards/${card.cardId}`,
        {
          method: "DELETE",
        }
      );
      fetchCards();
      if (!response.ok) {
        throw new Error("Error deleting card");
      }

      setCards(cards.filter((c) => c.id != card.cardId));
    } catch (error) {
      console.error("Error deleting cards: ", error);
    }
  };

  const handleUpvoteCard = async (card) => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${card.boardId}/cards/${card.cardId}/upvote`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("UpvoteCard Error");
      }
      const updatedCard = await response.json();
      // setCards(prevState => [...prevState, ...])
      fetchCards();
      setCards(cards.map((c) => (c.id === card.cardId ? updatedCard : c)));
    } catch (error) {
      console.error("Error upvoting card: ", error);
    }
  };

  console.log("ORDER CHANGING?", cards);

  return (
    <div>
      <h2>
        {" "}
        <b>Title: </b>
        {board.title}
      </h2>
      <button onClick={handleCreateCardClick} className="add-btn">
        Add New Card
      </button>
      {showModal && (
        <CardModal onClose={handleCloseModal} onSubmit={handleCreateCard} />
      )}
      {cards.length > 0 && (
        <div className="card-elems">
          {cards.map((card) => (
            <div key={card.cardId} className="card">
              <h3>{card.cardTitle}</h3>
              <div className="gif-container">
                <img src={card.gif} alt="Selected GIF" className="card-gif" />
              </div>
              <p>
                <b>Message: </b>
                {card.message}
              </p>
              <p>Author: {card.author}</p>
              <div className="card-btn">
                <button onClick={() => handleUpvoteCard(card)}>
                  Upvote: {card.voteCount}
                </button>
                <button onClick={() => handleDeleteCard(card)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
