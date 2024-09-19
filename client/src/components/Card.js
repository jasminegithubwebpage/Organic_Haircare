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
      className="bg-orange-200 p-4 rounded-lg shadow-md w-55 h-70 m-2 cursor-pointer overflow-hidden" // Set fixed size for the card
      onClick={handleCardClick} // Navigate on click
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-32 object-cover rounded-t-lg" // Adjust image size
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-xl font-semibold my-2">${product.price}</p>
        {/* Button to view details (optional) */}
        <button
          className="mt-2 bg-m500 hover:bg-m300 text-white font-bold py-1 px-4 rounded"
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
