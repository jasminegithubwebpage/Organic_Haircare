// UpdateProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [updateType, setUpdateType] = useState('count'); // 'count' or 'discount'
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3002/api/products/${productId}`, {
        [updateType]: value,
      });

      setMessage(`Product ID ${productId} updated successfully!`);
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Error updating product. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Update Product</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-2">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Update Type</label>
          <select
            value={updateType}
            onChange={(e) => setUpdateType(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="count">Count</option>
            <option value="discount">Discount</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">{updateType === 'count' ? 'New Count' : 'New Discount (%)'}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Product
        </button>
      </form>
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default UpdateProduct;
