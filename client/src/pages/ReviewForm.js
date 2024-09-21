import React, { useState } from "react";
import axios from "axios";

const ReviewForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/reviews", { comment, user_name: "User1" })
      .then((response) => {
        console.log("Review submitted", response.data);
        setComment(""); // Clear the form after submission
      });
  };

  return (
    <div className="bg-m100 p-10 w-1/2">
      <h3>Your Review</h3>
      <form onSubmit={handleSubmit} className="my-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your review"
          className="w-full h-40 border rounded-2xl p-2 mb-4 "
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
