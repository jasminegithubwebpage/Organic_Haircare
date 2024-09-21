import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 my-6">
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Total Sales</h3>
          <p className="text-xl font-semibold">₹4500.00</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Total Revenue</h3>
          <p className="text-xl font-semibold">₹9200.00</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Products Sold</h3>
          <p className="text-xl font-semibold">1000</p>
        </div>
        <div className="bg-y100 p-4 rounded-2xl shadow-md">
          <h3 className="text-n800">Customers</h3>
          <p className="text-xl font-semibold">5000</p>
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
            <th className="border-b px-4 py-2">Price</th>
            <th className="border-b px-4 py-2">Quantity</th>
            <th className="border-b px-4 py-2">Total Price</th>
            <th className="border-b px-4 py-2">Tracking Id</th>
            <th className="border-b px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(14)].map((_, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">Product</td>
              <td className="border-b px-4 py-2">Order Id</td>
              <td className="border-b px-4 py-2">Purchased On</td>
              <td className="border-b px-4 py-2">Amount</td>
              <td className="border-b px-4 py-2">Quantity</td>
              <td className="border-b px-4 py-2">Total Amount</td>
              <td className="border-b px-4 py-2">Tracking Id</td>
              <td className="border-b px-4 py-2">Status</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
