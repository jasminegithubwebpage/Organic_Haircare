import React from "react";
// import DashSideBar from '../components/DashSideBar';
// Assuming you have a Sidebar component
// import DashAvatar from '../components/DashAvatar';

const DashProduct = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 p-2 rounded-md"
          />
          <select className="border border-gray-300 p-2 rounded-md">
            <option>Week</option>
            <option>Month</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-maroon text-black">
            <th className="border-b px-4 py-2">Product</th>
            <th className="border-b px-4 py-2">Price</th>
            <th className="border-b px-4 py-2">Quantities</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">Product {index + 1}</td>
              <td className="border-b px-4 py-2">Price</td>
              <td className="border-b px-4 py-2">In Stock</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashProduct;
