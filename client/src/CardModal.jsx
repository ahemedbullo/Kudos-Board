import React, { useState } from "react";
import "./CardModal.css";

function CardModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [gif, setGif] = useState("");
  const [author, setAuthor] = useState("");
  const [gifQuery, setGifQuery] = useState("");
  const [gifQueryResult, setGifQueryResult] = useState([]);

  const fetchGifs = async (query) => {
    const apiKey = "EC9mGnNebbhExK0iaYV8XQq8a2o0Qudr";
    console.log(apiKey);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifQuery}&limit=10`;
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      const gifs = data.map((gif) => ({
        url: gif.images.fixed_height.url,
        id: gif.id,
      }));
      setGifQueryResult(gifs);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const handleSubmit = () => {
    if (!title || !message || !author) {
      alert("All fields required");
      return;
    }
    onSubmit({ cardTitle: title, message, gif, author });
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
          className="cardModal"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Message:</label>
        <input
          className="cardModal"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <label>Gif:</label>
        <input
          className="cardModal"
          type="text"
          placeholder="Search Gif"
          value={gifQuery}
          onChange={(e) => {
            setGifQuery(e.target.value);
            fetchGifs(e.target.value);
          }}
          required
        />
        <div className="gif-results">
          {gifQueryResult.map((gif) => (
            <img
              key={gif.id}
              src={gif.url}
              alt="gif"
              onClick={() => {
                setGif(gif.url);
                setGifQuery(gif.url);
                setGifQueryResult([]);
              }}
              style={{ cursor: "pointer", width: "100px", height: "100px" }}
            />
          ))}
        </div>

        <label>Author:</label>
        <input
          className="cardModal"
          type="text"
          placeholder="Title"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button className="submit" onClick={handleSubmit}>
          Create Card
        </button>
      </div>
    </div>
  );
}

export default CardModal;
