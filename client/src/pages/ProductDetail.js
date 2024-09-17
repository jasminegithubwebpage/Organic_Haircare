import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReview from "./ProductReview";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  // const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch product details by id
    fetch(`http://localhost:3002/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));

    // Fetch ingredients for the product
    fetch(`http://localhost:3002/products/${id}/ingredients`)
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Error fetching ingredients:", error));

  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">Price: ${product.price}</p>
      <p className="mb-4">{product.info}</p>

      <ul className="list-disc pl-6 mb-6">
  {Array.isArray(ingredients) && ingredients.length > 0 ? (
    ingredients.map((ingredient, index) => (
      <li key={index}>{ingredient.name}</li>
    ))
  ) : (
    <li>No ingredients found</li>
  )}
</ul>


      <ProductReview /> 
    </div>
  );
}

export default ProductDetail;
