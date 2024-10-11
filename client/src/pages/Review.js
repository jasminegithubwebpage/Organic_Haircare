import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = ({ productId }) => {
  const [localReviews, setLocalReviews] = useState([]); // State for reviews
  const [error, setError] = useState(""); // State for error handling

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/products/${productId}/reviews`);
        setLocalReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="w-1/2 bg-y100 p-10 h-full">
      <h3 className="mb-4">Reviews</h3>

      {error && <p className="text-red-500">{error}</p>}

      {localReviews.length > 0 ? (
        localReviews.map((review) => (
          <div
            key={review.review_id}
            className="bg-white p-10 m-5 border rounded-2xl"
          >
            <h4 className="font-bold">{review.user_name}</h4>
            <p className="r16">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default Review;
