import React from "react";

const Ingredients = ({ ingredients }) => {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <ul className="list-disc">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
