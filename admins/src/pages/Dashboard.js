import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const extractDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
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
        let totalRevenue = 0;
        let totalProductsSold = 0;

        ordersData.forEach((order) => {
          totalRevenue += Number(order.total_price) || 0;
          totalProductsSold += Number(order.quantity) || 0;
        });
        

        setTotalRevenue(totalRevenue);
        setProductsSold(totalProductsSold);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Determine the order status based on the delivery date
  const getOrderStatus = (deliveryDate) => {
    const today = new Date();
    return new Date(deliveryDate) < today ? "Completed" : "Pending";
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 my-6">
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Total Sales</h3>
          <p className="text-xl font-semibold">{orders.length}</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Total Revenue</h3>
          <p className="text-xl font-semibold">${Number(totalRevenue).toFixed(2)}</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Products Sold</h3>
          <p className="text-xl font-semibold">{productsSold}</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Customers</h3>
          <p className="text-xl font-semibold">{customersCount}</p>
        </div>
      </div>

      <header className="flex justify-between items-center mb-4">
        <h3>Recent Orders</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md"
          />
          <select className="px-4 py-2 border rounded-md">
            <option>Week</option>
            <option>Month</option>
          </select>
        </div>
      </header>

      <table className="w-full h-auto text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Product</th>
            <th className="border-b px-4 py-2">Order Id</th>
            <th className="border-b px-4 py-2">Order Date</th>
            {/* <th className="border-b px-4 py-2">Price</th> */}
            <th className="border-b px-4 py-2">Quantity</th>
            <th className="border-b px-4 py-2">Total Price</th>
            <th className="border-b px-4 py-2">Tracking Id</th>
            <th className="border-b px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">{order.product_id}</td>
              <td className="border-b px-4 py-2">{order.order_id}</td>
              <td className="border-b px-4 py-2">
               {extractDate(order.order_date)}
              </td>
             {/* <td className="border-b px-4 py-2">₹{order.price}</td> */}
              <td className="border-b px-4 py-2">{order.quantity}</td>
              <td className="border-b px-4 py-2">${order.total_price}</td>
              <td className="border-b px-4 py-2">{order.tracking_id}</td>
              <td className="border-b px-4 py-2">
                {getOrderStatus(order.deliveryDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
