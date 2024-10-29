import React, { useEffect, useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1); // Track quantity in ProductDetail
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate for routing

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
  }, [id]);

  const handleBuyNow = async () => {
    try {
      // Check if the user is authenticated
      const response = await axios.get("http://localhost:3002/api/auth/check");
      
      if (response.data.isAuthenticated) {
        // User is authenticated, proceed to payment
        navigate("/payment", { state: { product, quantity, id } });
      } else {
        // User is not authenticated, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      navigate("/login");
    }
  };
  

  // Add the conditional rendering here to wait for the product details
  if (!product.name) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-40 pt-20 items-center border border-orange-600">
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-2xl w-full h-full"
        />

        {/* Right: Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.info}</p>
          <p>Delivery date</p>
          <p>Stock remaining</p>
          <div className="text-xl font-semibold">₹ {product.price}</div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className="flex flex-row gap-6 p-5">
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
        <Review productId={id} /> {/* Send product ID to Review component */}
        {/* Review Form */}
        <ReviewForm product_id={id} /> {/* Pass product_id to ReviewForm */}
      </div>
    </div>
  );
};

export default ProductDetail;
