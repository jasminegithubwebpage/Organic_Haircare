import React from 'react';
import DashSideBar from '../components/DashSideBar'; // Assuming you have a Sidebar component already
import DashAvatar from '../components/DashAvatar';

const DashInventory = () => {
  return (
    <div className="flex h-auto">
      {/* Sidebar */}
      <DashSideBar/>

      {/* Main Content */}
      <main className="flex-grow bg-n100 p-6">
        <DashAvatar/>


        {/* Inventory Table */}
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
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
        </section>
      </main>
    </div>
  );
};

export default DashInventory;
