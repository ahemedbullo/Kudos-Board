import React, { useEffect, useState } from "react";

function Modal({ onClose }) {
  return (
    <div>
      <div className="new-board-form">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input type="text" required="" defaultValue="" />
        <label>Category:</label>
        <select required="">
          <option value="">Select a category</option>
          <option value="Recent">Recent</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>
        <label>Author:</label>
        <input type="text" defaultValue="" />
        <button className="submit">Create Board</button>
      </div>
    </div>
  );
}

export default Modal;
