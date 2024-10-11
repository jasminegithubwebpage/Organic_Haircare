import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext"; // Adjust the import according to your file structure

const ReviewForm = ({ product_id }) => {
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const { currentUser } = useUser(); // Get the current user's username

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(product_id);
    const reviewData = {
      comment,
      user_name: currentUser || "User1", // Use logged-in user or default to "User1"
      product_id,
    };

    axios
      .post("http://localhost:3002/reviews", reviewData)
      .then((response) => {
        console.log("Review submitted", response.data);
        setComment(""); // Clear the form after submission
        setSuccessMessage("Review submitted successfully!"); // Set success message
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      })
      .catch((error) => {
        console.error("There was an error submitting the review!", error);
      });
  };

  return (
    <div className="bg-m100 p-10 w-1/2">
      <h3>Your Review for Product</h3>
      {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit} className="my-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your review"
          className="w-full h-40 border rounded-2xl p-2 mb-4"
          required
        />
        <button
          type="submit"
          className="bg-m500 flex items-center justify-center text-white p-5 w-40 h-16 rounded-2xl lr20"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
