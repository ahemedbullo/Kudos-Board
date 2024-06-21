import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardModal from "./CardModal";

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

  useEffect(() => {
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
    fetchCards();
  }, [boardId, cards]);

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
      if (!response.ok) {
        throw new Error("Error deleting card");
      }
      setCards(cards.filter((c) => c.id != card.cardId));
    } catch (error) {
      console.error("Error deleting cards: ", error);
    }
  };

  return (
    <div>
      <h2>{board.title}</h2>
      <img src={board.image} alt="" />
      {/* <p>{board.category}</p> */}
      <p>Author: {board.author}</p>
      <button onClick={handleCreateCardClick}>Add New Card</button>
      {showModal && (
        <CardModal onClose={handleCloseModal} onSubmit={handleCreateCard} />
      )}
      {cards.length > 0 && (
        <div>
          {cards.map((card) => (
            <div key={card.cardId}>
              <h3>{card.cardTitle}</h3>
              <p>{card.message}</p>
              <img src={card.gif} alt="Selected GIF" />
              <p>Author: {card.author}</p>
              <button onClick={() => handleDeleteCard(card)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
