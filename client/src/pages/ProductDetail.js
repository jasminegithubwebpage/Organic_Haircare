import React, { useEffect, useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useParams,Link } from "react-router-dom";

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
    axios
      .get(`http://localhost:3002/products/${id}/ingredients`)
      .then((response) => {
        setIngredients(response.data);
      });

    // Fetch reviews
    axios
      .get(`http://localhost:3002/products/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      });
  }, [id]); // Add 'id' as a dependency

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <img src={product.image_url} alt={product.name} className="rounded-lg h-80 w-25" />

        {/* Right: Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.info}</p>
          <div className="text-xl font-semibold">₹ {product.price}</div>
          <button className="bg-m500 text-white px-4 py-2 rounded mt-4">
            Add to Cart
          </button>
         
         <Link to="/payment"> <button className="bg-m500 text-white px-4 py-2 rounded mt-4 ml-2">
            Buy Now
          </button></Link>
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
