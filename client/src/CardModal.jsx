import React, { useState } from "react";
import "./Modal.css";

function CardModal({ onClose, onSumbit }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [gif, setGif] = useState("");
  const [author, setAuthor] = useState("");

  const handleSumbit = () => {
    if (!title || !category || !author) {
      alert("All fields required");
      return;
    }
    onSumbit({ cardTitle: title, message, gif, author });
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="new-card-form" onClick={handleModalClick}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Card</h2>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Message:</label>
        <input
          type="text"
          placeholder="Title"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          placeholder="Title"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button className="submit" onClick={handleSumbit}>
          Create Card
        </button>
      </div>
    </div>
  );
}

export default CardModal;
