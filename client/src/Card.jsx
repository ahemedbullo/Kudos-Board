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
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}`
        );
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
        `${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}/cards`
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [boardId]);

  const handleCreateCard = async (cardData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );
      if (!response.ok) {
        throw new Error("Error creating card");
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
        `${import.meta.env.VITE_BACKEND_URL}/boards/${card.boardId}/cards/${
          card.cardId
        }`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting card");
      }
      fetchCards();
    } catch (error) {
      console.error("Error deleting card: ", error);
    }
  };

  const handleUpvoteCard = async (card) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/boards/${card.boardId}/cards/${
          card.cardId
        }/upvote`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("UpvoteCard Error");
      }
      const updatedCard = await response.json();
      fetchCards();
    } catch (error) {
      console.error("Error upvoting card: ", error);
    }
  };

  return (
    <div>
      <h2>
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
            <CardItem
              key={card.cardId}
              card={card}
              fetchCards={fetchCards}
              handleDeleteCard={handleDeleteCard}
              handleUpvoteCard={handleUpvoteCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CardItem({ card, fetchCards, handleDeleteCard, handleUpvoteCard }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentCard = async (commentText) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/boards/${card.boardId}/cards/${
          card.cardId
        }/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: commentText }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update comment on card");
      }
      const updatedCard = await response.json();
      fetchCards();
      setComment("");
    } catch (error) {
      console.error("Error updating comment on card: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comment.trim()) {
      await handleCommentCard(comment);
    }
  };

  return (
    <div className="card">
      <h3>{card.cardTitle}</h3>
      <div className="gif-container">
        <img src={card.gif} alt="Selected GIF" className="card-gif" />
      </div>
      <p>
        <b>Message: </b>
        {card.message}
      </p>
      <p>Author: {card.author}</p>
      <p>
        <b>Comment: </b> {card.comment}
      </p>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={handleCommentChange}
          value={comment}
        />
        <button type="submit">Post Comment</button>
      </form>
      <div className="card-btn">
        <button onClick={() => handleUpvoteCard(card)}>
          Upvote: {card.voteCount}
        </button>
        <button onClick={() => handleDeleteCard(card)}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
