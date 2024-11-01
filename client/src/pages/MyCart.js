import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "./UserContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/cart/${user.id}`);
        setProducts(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart details", error);
      }
    };

    fetchProducts();
  }, [user.id]); // Add user.id as a dependency

  const calculateTotal = (products) => {
    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);
  };

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`http://localhost:3002/cart/${cartId}`);
      const updatedProducts = products.filter(product => product.cart_id !== cartId);
      setProducts(updatedProducts);
      calculateTotal(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await axios.put(`http://localhost:3002/cart/${cartId}`, { quantity: newQuantity });
      const updatedProducts = products.map(product => 
        product.cart_id === cartId ? { ...product, quantity: newQuantity } : product
      );
      setProducts(updatedProducts);
      calculateTotal(updatedProducts);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleBuyNow = () => {
    navigate("/payment", { state: { totalPrice, products } }); // Pass totalPrice and products to payment page
  };

  return (
    <div className="flex w-full p-4 gap-4 border-red-600">
      <div className="w-1/2 border-red-600 cart-items">
        {products.map((product) => (
          <div key={product.cart_id} className="flex gap-6 p-4 cart-item">
            <div>
              <img src={product.image_url} alt={product.product_name} className="proImg" />
            </div>
            <div className="justify-between py-1 w-full product-info">
              <div className="flex justify-between">
                <h4 className="text-m500">{product.product_name}</h4>
                <h4 className="text-m500">₹ {parseFloat(product.price).toFixed(2)}</h4>
              </div>

              <div className="flex py-1 justify-between">
                <div className="flex gap-8">
                  <p>₹ {parseFloat(product.price).toFixed(2)}</p>
                  <p>In stock</p>
                </div>
              </div>

              <div className="gap-4 py-1 quantity-control">
                <label>Quantity: </label>
                <input 
                  type="number" 
                  value={product.quantity} 
                  min={1} 
                  onChange={(e) => handleUpdateQuantity(product.cart_id, parseInt(e.target.value))} 
                />
              </div>

              <div className="flex py-1 gap-2">
                <button
                  className="delete-btn gap-2"
                  onClick={() => handleDelete(product.cart_id)}
                >
                  <span className="pe-2">
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                  </span>
                  Delete
                </button>
                <button
                  className="buy-now-btn"
                  onClick={handleBuyNow} // Call handleBuyNow directly
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 border-red-600 total-price">
        <h3 className="text-m500">Total Price:</h3>
        <h4 className="text-xl font-bold">₹ {parseFloat(totalPrice).toFixed(2)}</h4>
        <button className="bg-blue-500 text-white p-4 rounded mt-4" onClick={handleBuyNow}>
          Proceed to Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
