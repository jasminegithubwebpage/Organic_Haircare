import React from "react";
import { Link } from "react-router-dom";
const Card = ({ product }) => {
  return (
    <div className="bg-orange-200 p-4 rounded-lg shadow-md max-w-xs m-2 w-64 h-70">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        {/* <p className="text-sm text-gray-500">{product.info}</p> */}
        <p className="text-xl font-semibold my-2">${product.price}</p>
        <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block bg-m500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Details
      </Link>
      </div>
    </div>
  );
};

export default Card;
