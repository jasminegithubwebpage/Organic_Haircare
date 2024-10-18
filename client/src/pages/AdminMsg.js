import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminMsg = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const navigate = useNavigate();

  // Function to fetch low stock products from the backend
  const fetchLowStockProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/low-stock');
      setLowStockProducts(response.data);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      {lowStockProducts.length > 0 ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Low Stock Alert!</strong>
          <ul className="mt-2">
            {lowStockProducts.map((product) => (
              <li key={product.id}>
                Product ID: {product.id} - Current Stock: {product.count}
                <button
                  onClick={() => navigate('/dashboard/update-product')}
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Fix
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-green-600">All products have sufficient stock.</p>
      )}
    </div>
  );
};

export default AdminMsg;
