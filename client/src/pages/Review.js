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
    <div className="w-1/2 bg-y100 p-10 h-full">
      <h3 className="mb-4">Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review.review_id}
          className="bg-white p-10 m-5 border rounded-2xl"
        >
          <h4>{review.user_name}</h4>
          <p className="r16">{review.comment}</p>
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
