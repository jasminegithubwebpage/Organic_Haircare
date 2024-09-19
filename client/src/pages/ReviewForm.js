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
    <form onSubmit={handleSubmit} className="my-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your review"
        className="w-full border rounded p-2 mb-4"
      />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
