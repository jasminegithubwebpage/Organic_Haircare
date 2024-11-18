import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("All"); // Options: All, Week, Month

  // Extract and format date
  const extractDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Determine the order status based on the delivery date
  const getOrderStatus = (deliveryDate) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);

    if (delivery < today) {
      return "Completed";
    } else if (delivery.toDateString() === today.toDateString()) {
      return "Out for Delivery";
    } else {
      return "Pending";
    }
  };

  // Fetch orders and users data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get("http://localhost:3002/api/orders");
        const usersResponse = await axios.get("http://localhost:3002/api/users");

        const ordersData = ordersResponse.data;
        const usersData = usersResponse.data;

        // Set state with data from users table
        setCustomersCount(usersData.length);

        // Calculate total revenue and products sold
        let totalRevenueCalc = 0;
        let totalProductsSoldCalc = 0;

        ordersData.forEach((order) => {
          totalRevenueCalc += Number(order.total_price) || 0;
          totalProductsSoldCalc += Number(order.quantity) || 0;
        });

        setTotalRevenue(totalRevenueCalc);
        setProductsSold(totalProductsSoldCalc);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle time filter change
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const getFilteredOrders = () => {
    return orders.filter((order) => {
      // Time Filter Logic
      if (timeFilter !== "All") {
        const orderDate = new Date(order.order_date);
        const today = new Date();
        const diffTime = today - orderDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
        if (timeFilter === "Week" && diffDays > 7) {
          return false;
        }
        if (timeFilter === "Month" && diffDays > 30) {
          return false;
        }
      }
  
      // Global Search Logic
      if (searchTerm.trim() === "") {
        return true;
      }
  
      const lowerSearchTerm = searchTerm.toLowerCase();
  
      return (
        String(order.product_id).toLowerCase().includes(lowerSearchTerm) ||
        String(order.order_id).toLowerCase().includes(lowerSearchTerm) || // Convert order_id to string
        extractDate(order.order_date).toLowerCase().includes(lowerSearchTerm) ||
        String(order.quantity).toLowerCase().includes(lowerSearchTerm) ||
        String(order.total_price).toLowerCase().includes(lowerSearchTerm) ||
        String(order.tracking_id).toLowerCase().includes(lowerSearchTerm) ||
        getOrderStatus(order.delivery_date).toLowerCase().includes(lowerSearchTerm)
      );
    });
  };
  

  const filteredOrders = getFilteredOrders();

  return (
    <>
      {/* Metrics Section */}
      <div className="grid grid-cols-4 gap-4 my-6">
        <div className="bg-yellow-100 p-4 rounded-2xl shadow-md">
          <h3 className="text-gray-800">Total Sales</h3>
          <p className="text-xl font-semibold">{orders.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-2xl shadow-md">
          <h3 className="text-gray-800">Total Revenue</h3>
          <p className="text-xl font-semibold">${Number(totalRevenue).toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-2xl shadow-md">
          <h3 className="text-gray-800">Products Sold</h3>
          <p className="text-xl font-semibold">{productsSold}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-2xl shadow-md">
          <h3 className="text-gray-800">Customers</h3>
          <p className="text-xl font-semibold">{customersCount}</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Recent Orders</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search across all columns"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md"
          />
          <select value={timeFilter} onChange={handleTimeFilterChange} className="px-4 py-2 border rounded-md">
            <option value="All">All Time</option>
            <option value="Week">Last Week</option>
            <option value="Month">Last Month</option>
          </select>
        </div>
      </header>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full h-auto text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Product ID</th>
              <th className="border-b px-4 py-2">Order ID</th>
              <th className="border-b px-4 py-2">Order Date</th>
              <th className="border-b px-4 py-2">Quantity</th>
              <th className="border-b px-4 py-2">Total Price</th>
              <th className="border-b px-4 py-2">Tracking ID</th>
              <th className="border-b px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td className="border-b px-4 py-2">{order.product_id}</td>
                  <td className="border-b px-4 py-2">{order.order_id}</td>
                  <td className="border-b px-4 py-2">{extractDate(order.order_date)}</td>
                  <td className="border-b px-4 py-2">{order.quantity}</td>
                  <td className="border-b px-4 py-2">${Number(order.total_price).toFixed(2)}</td>
                  <td className="border-b px-4 py-2">{order.tracking_id}</td>
                  <td className="border-b px-4 py-2">{getOrderStatus(order.delivery_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border-b px-4 py-2 text-center" colSpan="7">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
