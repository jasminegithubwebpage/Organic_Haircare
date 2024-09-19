// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductReview from "./ProductReview";

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [ingredients, setIngredients] = useState([]);
//   // const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // Fetch product details by id
//     fetch(`http://localhost:3002/products/${id}`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) => console.error("Error fetching product:", error));

//     // Fetch ingredients for the product
//     fetch(`http://localhost:3002/products/${id}/ingredients`)
//       .then((response) => response.json())
//       .then((data) => setIngredients(data))
//       .catch((error) => console.error("Error fetching ingredients:", error));

//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <p className="text-lg mb-4">Price: ${product.price}</p>
//       <p className="mb-4">{product.info}</p>

//       <ul className="list-disc pl-6 mb-6">
//   {Array.isArray(ingredients) && ingredients.length > 0 ? (
//     ingredients.map((ingredient, index) => (
//       <li key={index}>{ingredient.name}</li>
//     ))
//   ) : (
//     <li>No ingredients found</li>
//   )}
// </ul>


//       <ProductReview /> 
//     </div>
//   );
// }

// export default ProductDetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:3002/products/${id}`).then((response) => {
      setProduct(response.data);
    });

    // Fetch ingredients
    axios.get(`http://localhost:3002/products/${id}/ingredients`).then((response) => {
      setIngredients(response.data);
    });

    // Fetch reviews
    axios.get(`http://localhost:3002/products/${id}/reviews`).then((response) => {
      setReviews(response.data);
    });
  }, [id]); // Add 'id' as a dependency

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <img src={product.image_url} alt={product.name} className="rounded-lg" />

        {/* Right: Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.info}</p>
          <div className="text-xl font-semibold">₹ {product.price}</div>
          <button className="m500 text-white px-4 py-2 rounded mt-4">
            Add to Cart
          </button>
          <button className="m500 text-white px-4 py-2 rounded mt-4 ml-2">
            Buy Now
          </button>

          {/* Ingredients */}
          <Ingredients ingredients={ingredients} />

          {/* Reviews */}
          <Review reviews={reviews} />
        </div>
      </div>

      {/* Review Form */}
      <ReviewForm />
    </div>
  );
};

export default ProductDetail;

