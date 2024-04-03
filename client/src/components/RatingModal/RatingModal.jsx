import React, { useState } from "react";
import "./RatingModal.css";

const RatingModal = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ rating, review });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Rate Order</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={value <= rating ? "active" : ""}
              onClick={() => handleRatingChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <textarea
          className="review-textarea"
          placeholder="Write your review..."
          value={review}
          onChange={handleReviewChange}
        ></textarea>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
