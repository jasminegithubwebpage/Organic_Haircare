import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import { useUser } from "./UserContext";
import toast from "react-hot-toast";

const MyCart = () => {
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndStock = async () => {
      try {
        const cartResponse = await axios.get(`http://localhost:3002/cart/${user.id}`);
        const cartProducts = cartResponse.data;

        const lowStockResponse = await axios.get(`http://localhost:3002/api/low-stock`);
        const lowStockData = lowStockResponse.data;

        const updatedProducts = cartProducts.map((product) => {
          const lowStockProduct = lowStockData.find((item) => item.id === product.product_id);
          return {
            ...product,
            stock: lowStockProduct ? lowStockProduct.stock : product.quantity,
          };
        });

        setProducts(updatedProducts);
        setLowStockProducts(lowStockData.map((item) => item.id));
        calculateTotal(updatedProducts);
      } catch (error) {
        console.error("Error fetching cart or stock details", error);
        toast.error("Failed to load cart items or stock details");
      }
    };

    fetchProductsAndStock();
  }, [user.id]);

  const calculateTotal = (products) => {
    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(total);
  };

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`http://localhost:3002/cart/${cartId}`);
      const updatedProducts = products.filter((product) => product.cart_id !== cartId);
      setProducts(updatedProducts);
      calculateTotal(updatedProducts);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await axios.put(`http://localhost:3002/cart/${cartId}`, { quantity: newQuantity });
      const updatedProducts = products.map((product) =>
        product.cart_id === cartId ? { ...product, quantity: newQuantity } : product
      );
      setProducts(updatedProducts);
      calculateTotal(updatedProducts);
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleIndividualBuyNow = (product) => {
    // Ensure quantity is available or set to 1 if not
    const quantity = product.quantity || 1;
    navigate("/payment", {
      state: {
        productData: [{ ...product, quantity }], // Wrap product in an array for consistency
        totalPrice: product.price * quantity,   // Calculate totalPrice based on quantity
      },
    });
    toast.success(`Proceeding to checkout for ${product.product_name}`);
  };
  
  const handleOverallBuyNow = () => {
    // Make sure to calculate totalPrice based on the cart products
    const productData = products.map((product) => ({
      product: product.name, // Make sure this matches the key used in the cart
      quantity: product.quantity,
      id: product.id,
      price: product.price,
    }));
    
    const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  
    console.log(productData);
    navigate("/payment", { state: { productData, totalPrice } });
    toast.success("Proceeding to checkout");
  };
  
  
  return (
    <div className="flex w-full p-4 gap-4">
      <div className="w-1/2">
        {products.map((product) => (
          <div key={product.cart_id} className="flex gap-6 p-4 border-b">
            <img src={product.image_url} alt={product.product_name} className="w-32 h-32 object-cover" />
            <div className="w-full">
              <div className="flex justify-between">
                <h4>{product.name}</h4>
                <h4>₹ {parseFloat(product.price).toFixed(2)}</h4>
              </div>
              <div className="flex justify-between py-2">
                <p>{product.stock === 0 ? "Out of Stock" : "In Stock"}</p>
                <div className="flex gap-8">
                  <p>₹ {parseFloat(product.price * product.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <label>Qty: </label>
                    <input
                      type="number"
                      value={product.quantity}
                      min={1}
                      onChange={(e) => handleUpdateQuantity(product.cart_id, parseInt(e.target.value))}
                      className="w-12 text-center"
                      disabled={product.stock === 0}
                    />
                  </div>
                </div>
              </div>
              <div className="flex py-1 gap-2">
                <button
                  className="text-red-500 flex items-center gap-2 bg-m500 text-white rounded-lg px-3 py-1"
                  onClick={() => handleDelete(product.cart_id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button
                  onClick={() => handleIndividualBuyNow(product)}
                  className="text-blue-500 flex items-center gap-2 bg-m500 text-white rounded-lg px-3 py-1"
                  disabled={product.stock === 0}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 bg-gray-100 p-4">
        <h3>Total Price: ₹ {parseFloat(totalPrice).toFixed(2)}</h3>
        <button
          className="bg-m500 text-white p-4 rounded w-full mt-4 rounded-lg"
          onClick={handleOverallBuyNow}
          disabled={products.length === 0 || totalPrice === 0}
        >
          {products.length === 0 || totalPrice === 0 ? "Loading..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default MyCart;
