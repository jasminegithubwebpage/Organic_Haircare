import React from 'react';
import DashSideBar from '../components/DashSideBar';
import DashAvatar from '../components/DashAvatar';

const DashCustomer = () => {
  return (
    <div className="flex h-auto">
      {/* Sidebar */}
      <DashSideBar/>

      {/* Main Content */}
      <main className="flex-grow bg-n100 p-6">
        <DashAvatar/>


        {/* Customers Table */}
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Phone</th>
                <th className="border-b px-4 py-2">Orders</th>
                <th className="border-b px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">Product</td>
                  <td className="border-b px-4 py-2">Amount</td>
                  <td className="border-b px-4 py-2">In Stock</td>
                  <td className="border-b px-4 py-2">abc123@gmail.com</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default DashCustomer;
