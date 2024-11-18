import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const SAInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all"); // Default filter option

  // Fetch inventory data
  const fetchInventory = async (search = "", filter = "all") => {
    try {
      const response = await axios.get(
        `http://localhost:3002/dashboard/search/inventory?search=${search}&filter=${filter}`
      );
      setInventory(response.data);
      setFilteredInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventory(); // Fetch all inventory data on component mount
  }, []);

  // Handle search input with debouncing
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedFetchInventory(event.target.value, filterOption);
  };

  const debouncedFetchInventory = useCallback(
    debounce((search, filter) => fetchInventory(search, filter), 300),
    []
  );

  // Handle dropdown selection for filtering
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterOption(selectedFilter);
    fetchInventory(searchTerm, selectedFilter);
  };

  return (
    <>
      <h3 className="mb-4">Inventory</h3>

      {/* Search and Filter Options */}
      <div className="flex space-x-4 mb-4">
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
          <option value="all">All</option>
          <option value="low-stock">Low Stock</option>
          <option value="high-sales">High Sales</option>
        </select>
      </div>

      {/* Inventory Table */}
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
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <tr key={item.sales_id}>
                <td className="border-b px-4 py-2">{item.product_name}</td>
                <td className="border-b px-4 py-2">${item.price}</td>
                <td className="border-b px-4 py-2">{item.available_quantity}</td>
                <td className="border-b px-4 py-2">Customer Review</td>
                <td className="border-b px-4 py-2">{item.quantity_sold}</td>
                <td className="border-b px-4 py-2">${item.total_sale_value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border-b px-4 py-2 text-center">
                No Inventory Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

// Debounce function
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default SAInventory;
