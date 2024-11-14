import React, { useEffect, useState } from "react";
import axios from "axios";
import Ingredients from "./Ingredients";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../pages/UserContext";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const initialProduct = location.state?.product;
    if (initialProduct) {
      setProduct(initialProduct);
    } else {
      // Fetch product data if not passed via navigate
      axios.get(`http://localhost:3002/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }

    // Fetch ingredients regardless of how we navigated
    axios.get(`http://localhost:3002/products/${id}/ingredients`).then((response) => {
      setIngredients(response.data);
    });
  }, [id, location.state]);

  const handleAddToCart = () => {
    const cartData = {
      product_id: id,
      product_name: product.name,
      quantity,
      price: product.price,
      user_id: user.id,
    };
    axios
      .post("http://localhost:3002/cart", cartData)
      .then(() => {
        setSuccessMessage(`${product.name} added to cart successfully!`);
        setTimeout(() => setSuccessMessage(""), 3000); 
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  const handleBuyNow = () => {
    navigate("/payment", { state: { product, quantity, id } });
  };

  if (!product.name) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-40 pt-20 items-center border border-orange-600">
      <div className="grid grid-cols-2 gap-8">
        <img src={product.image_url} alt={product.name} className="rounded-2xl w-full h-full" />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="my-4">{product.info}</p>
          <div className="text-xl font-semibold">₹ {product.price}</div>

          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className="flex flex-row gap-6 p-5">
            <button
              onClick={handleAddToCart}
              className="bg-m500 text-white p-5 w-40 h-16 rounded-2xl"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-b500 text-white p-5 w-40 h-16 rounded-2xl"
            >
              Buy Now
            </button>
          </div>

          {successMessage && (
            <p className="text-green-600 mt-4">{successMessage}</p>
          )}
        </div>

        <Ingredients ingredients={ingredients} />
      </div>

      <div className="flex flex-row">
        <Review productId={id} />
        <ReviewForm product_id={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
