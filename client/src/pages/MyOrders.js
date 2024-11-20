import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../pages/UserContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.error("User ID not available");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:3002/api/Allorders?userId=${userId}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Orders data:", data);
          setOrders(data); // Assuming the API returns an array of orders
        } else {
          console.error("Failed to fetch orders:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchOrders();
  }, [userId]);

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`); // Navigate to order details page
  };

  return (
    <div className="container mx-auto py-12">
  <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>

  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : orders.length === 0 ? (
    <p className="text-center text-gray-500">You have no orders yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order.order_id}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() => handleOrderClick(order.order_id)}
        >
          <h3 className="text-2xl font-semibold text-blue-600">Order ID: {order.order_id}</h3>
          <p className="text-gray-700 mt-2">Product ID: {order.product_id}</p>
          <p className="text-gray-700 mt-2">Quantity: {order.quantity}</p>
          <p className="text-gray-700 mt-2">Total Price: ₹{order.total_price}</p>
          <p className="text-gray-700 mt-2">Payment Method: {order.payment_method}</p>
          <p className="text-gray-700 mt-2">Tracking ID: {order.tracking_id}</p>
          <p className="text-gray-700 mt-2">Delivery Date: {order.delivery_date}</p>
          <p className="text-gray-700 mt-2">Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default MyOrders;
