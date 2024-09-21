import React, { useEffect, useState } from "react";
import axios from "axios";

const DashInventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3002/dashboard/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <>
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
          {inventory.map((item) => (
            <tr key={item.sales_id}> {/* Corrected here */}
              <td className="border-b px-4 py-2">{item.product_name}</td>
              <td className="border-b px-4 py-2">${item.price}</td>
              <td className="border-b px-4 py-2">{item.available_quantity}</td>
              <td className="border-b px-4 py-2">Customer Review</td>
              <td className="border-b px-4 py-2">{item.quantity_sold}</td>
              <td className="border-b px-4 py-2">${item.total_sale_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashInventory;
