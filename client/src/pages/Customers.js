import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customer details from the backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b">Customer ID</th>
            <th className="py-3 px-4 border-b">Username</th>
            <th className="py-3 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-100 ">
                <td className="py-3 px-4 border-b">{customer.id}</td>
                <td className="py-3 px-4 border-b">{customer.username}</td>
                <td className="py-3 px-4 border-b">{customer.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-4 border-b text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
