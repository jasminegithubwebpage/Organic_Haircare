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
        const response = await fetch(`/api/Allorders?userId=${userId}`); // Pass userId as a query parameter
        if (response.ok) {
          const data = await response.json();
          console.lod(data);
          setOrders(data); // Assuming the API returns an array of orders
        } else {
          console.error("Failed to fetch orders");
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
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="border p-4 rounded cursor-pointer"
              onClick={() => handleOrderClick(order.order_id)}
            >
              <h3 className="text-xl font-bold">Order ID: {order.order_id}</h3>
              <p>Product ID: {order.product_id}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ₹{order.total_price}</p>
              <p>Payment Method: {order.payment_method}</p>
              <p>Tracking ID: {order.tracking_id}</p>
              <p>Delivery Date: {order.delivery_date}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
