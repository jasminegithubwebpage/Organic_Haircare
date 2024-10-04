import React, { useEffect, useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useParams,useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1); // Track quantity in ProductDetail
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate for routing

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
  }, [id]);

  const handleBuyNow = () => {
    // Navigate to the payment page and pass product & quantity via state
    navigate("/payment", { state: { product, quantity } });
  };

  return (
    <div className="p-40 pt-20 items-center border border-orange-600">
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <img src={product.image_url} alt={product.name} className="rounded-2xl w-full h-full" />

        {/* Right: Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.info}</p>
          <p>Delivery date</p>
          <p>Stock remaining</p>
          <div className="text-xl font-semibold">₹ {product.price}</div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className="flex flex-row gap-6 p-5">
            <button className="bg-m500 flex items-center justify-center text-white p-5 w-40 h-16 rounded-2xl lr20">
              Add to Cart
            </button>

            {/* Navigate to Payment page */}
            <button
              onClick={handleBuyNow}
              className="bg-b500 flex items-center justify-center text-white p-5 w-40 h-16 rounded-2xl lr20"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <Ingredients ingredients={ingredients} />
      </div>

      <div className="flex flex-row">
        {/* Reviews */}
        <Review reviews={reviews} />
        {/* Review Form */}
        <ReviewForm />
      </div>
    </div>
  );
};

export default ProductDetail;
