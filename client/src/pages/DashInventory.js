import React from "react";
// import DashSideBar from '../components/DashSideBar';
// Assuming you have a Sidebar component already
// import DashAvatar from '../components/DashAvatar';

const DashInventory = () => {
  return (
    <>
      {/* Inventory Table */}

      <h2 className="text-xl font-semibold mb-4">Inventory</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Product</th>
            <th className="border-b px-4 py-2">Price</th>
            <th className="border-b px-4 py-2">Quantities</th>
            <th className="border-b px-4 py-2">Review</th>
            <th className="border-b px-4 py-2">Monthly Sale</th>
            <th className="border-b px-4 py-2">Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">Product {index + 1}</td>
              <td className="border-b px-4 py-2">$100</td>
              <td className="border-b px-4 py-2">In Stock</td>
              <td className="border-b px-4 py-2">Customer Review</td>
              <td className="border-b px-4 py-2">Monthly Sale</td>
              <td className="border-b px-4 py-2">Product Sold</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashInventory;
