import React, { useState } from "react";
import "./Modal.css";

function Modal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const handleSumbit = () => {
    if (!title || !category || !author) {
      alert("All fields required");
      return;
    }
    onSubmit({ title, image, category, author });
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="new-board-form" onClick={handleModalClick}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="All">All</option>
          <option value="Recent">Recent</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>

        <label>Author:</label>
        <input
          type="text"
          placeholder="Title"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button className="submit" onClick={handleSumbit}>
          Create Board
        </button>
      </div>
    </div>
  );
}

export default Modal;
