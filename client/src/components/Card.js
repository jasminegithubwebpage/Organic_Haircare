import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();

  // Handle click on the entire card to navigate to product details
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="bg-y300 p-4 rounded-2xl shadow-md cursor-pointer w-70 overflow-hidden" // Set fixed size for the card
      onClick={handleCardClick} // Navigate on click
    >
      <div className="flex justify-center pt-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-50 h-80 object-cover rounded-2xl" // Adjust image size
        />
      </div>

      <div className="p-2">
        <p className="lb20">{product.name}</p>
        <p className="lr20 my-2">${product.price}</p>
        {/* Button to view details (optional) */}
        <button
          className="mt-2 bg-m500 hover:bg-m300 text-white font-bold p-4 rounded-2xl"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click when clicking the button
            navigate(`/products/${product.id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
