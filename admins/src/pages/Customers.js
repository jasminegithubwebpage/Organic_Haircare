import React, { useEffect, useState } from "react";
import axios from "axios";

const SACustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3002/dashboard/search/users");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <h3 className="mb-4">Customers</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">City</th>
            <th className="border-b px-4 py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{customer.username}</td>
                <td className="border-b px-4 py-2">{customer.email}</td>
                <td className="border-b px-4 py-2">{customer.city || "N/A"}</td>
                <td className="border-b px-4 py-2">{customer.country || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border-b px-4 py-2 text-center">
                No Customers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SACustomer;
