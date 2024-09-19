import React from "react";
import axios from "axios";

const Reviews = ({ reviews }) => {
  const handleLike = (reviewId) => {
    axios.post(`http://localhost:3002/reviews/${reviewId}/like`).then(() => {
      // Update the likes count (you can trigger a state update here)
    });
  };

  const handleDislike = (reviewId) => {
    axios.post(`http://localhost:3002/reviews/${reviewId}/dislike`).then(() => {
      // Update the dislikes count (trigger state update)
    });
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.review_id} className="p-4 border rounded-lg mb-4">
          <h3 className="text-xl font-semibold">{review.user_name}</h3>
          <p>{review.comment}</p>
          <div className="flex items-center">
            <button
              onClick={() => handleLike(review.review_id)}
              className="text-green-500 mr-4"
            >
              👍 {review.likes}
            </button>
            <button
              onClick={() => handleDislike(review.review_id)}
              className="text-red-500"
            >
              👎 {review.dislikes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
