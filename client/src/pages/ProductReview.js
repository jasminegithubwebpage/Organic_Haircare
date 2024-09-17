import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ProductReview() {
  const { id } = useParams(); // Get the product ID from the URL
  const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3002/products/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); // Directly set the data as reviews
        if (data.length > 0) {
          // Calculate average rating if reviews exist
          const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
          setAvgRating(totalRating / data.length);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Product Reviews</h1>
      <p className="text-center text-lg font-medium">
        Overall Rating: {avgRating.toFixed(1)} / 5
      </p>

      <div className="mt-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border p-4 mb-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{review.user_name}</h2>
              <p>{review.comment}</p>
              <p className="text-sm">
                Likes: {review.likes}, Dislikes: {review.dislikes}
              </p>
              <p className="font-bold">Rating: {review.rating} / 5</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form className="mt-4">
          <textarea
            className="border p-2 w-full mb-4"
            placeholder="Write your review"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReview;
