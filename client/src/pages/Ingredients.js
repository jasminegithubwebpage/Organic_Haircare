import React, { useEffect, useState } from "react";

const Ingredients = ({ ingredients }) => {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    if (typeof ingredients === "string") {
      // Remove curly braces, split by commas, and trim any extra spaces
      const parsedIngredients = ingredients
        .replace(/[{}]/g, "") // Remove the curly braces
        .split(",") // Split by commas
        .map((item) => item.trim()); // Trim each ingredient

      setIngredientList(parsedIngredients);
    }
  }, [ingredients]);

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
