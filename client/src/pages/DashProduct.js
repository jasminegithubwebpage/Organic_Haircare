import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Assuming you use moment.js for date handling

import { useNavigate } from "react-router-dom";
const DashProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("week"); // Default to 'week'

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/dashboard/products"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input
  const handleSearchChange = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );
    applyFilterOption(filtered, filterOption); // Apply filter after searching
  };

  // Handle dropdown selection change (Week or Month)
  const handleFilterChange = (event) => {
    const option = event.target.value;
    setFilterOption(option);
    applyFilterOption(products, option);
  };

  // Function to apply the selected filter (Week or Month)
  const applyFilterOption = (productList, option) => {
    const now = moment();
    let filtered;

    if (option === "week") {
      filtered = productList.filter(
        (product) => moment(product.added_date).isSame(now, "week") // Assuming 'created_at' column
      );
    } else if (option === "month") {
      filtered = productList.filter(
        (product) => moment(product.added_date).isSame(now, "month") // Assuming 'created_at' column
      );
    }

    setFilteredProducts(filtered);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3>Product</h3>
        <button
          class="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded"
          onClick={() => navigate("/add-product")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </button>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 p-2 rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="border border-gray-300 p-2 rounded-md"
            value={filterOption}
            onChange={handleFilterChange}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.sale_id}>
                <td className="border-b px-4 py-2">{product.name}</td>
                <td className="border-b px-4 py-2">${product.price}</td>
                <td className="border-b px-4 py-2">{product.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border-b px-4 py-2 text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DashProduct;
