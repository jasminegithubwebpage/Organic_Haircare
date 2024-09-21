import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Assuming you use moment.js for date handling

const DashProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("week"); // Default to 'week'

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/dashboard/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
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
      filtered = productList.filter(product =>
        moment(product.added_date).isSame(now, 'week') // Assuming 'created_at' column
      );
    } else if (option === "month") {
      filtered = productList.filter(product =>
        moment(product.added_date).isSame(now, 'month') // Assuming 'created_at' column
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product</h2>
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
            filteredProducts.map(product => (
              <tr key={product.product_id}>
                <td className="border-b px-4 py-2">{product.name}</td>
                <td className="border-b px-4 py-2">${product.price}</td>
                <td className="border-b px-4 py-2">{product.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border-b px-4 py-2 text-center">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DashProduct;
