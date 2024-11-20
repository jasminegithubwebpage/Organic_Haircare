import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function VisualSales() {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minQuantity, setMinQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(Infinity);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:3002/api/product-sales")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        if (!response.headers.get("content-type").includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSalesData(data);
          setFilteredData(data);

          // Initialize checkboxes for each product
          const initialProductSelection = data.reduce((acc, item) => {
            acc[item.product_name] = true; // All products selected by default
            return acc;
          }, {});
          setSelectedProducts(initialProductSelection);
        } else {
          console.error("Fetched data is not an array:", data);
          setSalesData([]);
          setFilteredData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product sales data:", error);
        setSalesData([]);
        setFilteredData([]);
      });
  }, []);

  const handleDateFilter = () => {
    const filtered = salesData.filter((item) => {
      const saleDate = new Date(item.sale_date);
      return (
        (!startDate || saleDate >= startDate) &&
        (!endDate || saleDate <= endDate)
      );
    });
    applyFilters(filtered);
  };

  const handleQuantityFilter = () => {
    const filtered = salesData.filter((item) => {
      return (
        item.quantity_sold >= minQuantity &&
        item.quantity_sold <= maxQuantity
      );
    });
    applyFilters(filtered);
  };

  const handleCheckboxChange = (productName) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productName]: !prev[productName],
    }));
  };

  const applyFilters = (data) => {
    const filtered = data.filter(
      (item) =>
        selectedProducts[item.product_name] &&
        item.quantity_sold >= minQuantity &&
        item.quantity_sold <= maxQuantity
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    // Apply all filters whenever selectedProducts, minQuantity, maxQuantity, startDate, or endDate changes
    handleDateFilter();
  }, [selectedProducts, minQuantity, maxQuantity, startDate, endDate]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const quantityChartData = {
    labels: (filteredData || []).map((data) => data.product_name),
    datasets: [
      {
        label: "Quantity Sold",
        data: (filteredData || []).map((data) => data.quantity_sold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const valueChartData = {
    labels: (filteredData || []).map((data) => data.product_name),
    datasets: [
      {
        label: "Total Sale Value",
        data: (filteredData || []).map((data) => data.total_sale_value),
        backgroundColor: (filteredData || []).map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.6)`
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Product Sales</h2>

      <div className="p-6 bg-gray-100 rounded-lg shadow-md space-y-6">
  {/* Date Filter Section */}
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex flex-col gap-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        Start Date:
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex flex-col gap-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        End Date:
      </label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="self-end md:self-center">
      <button
        onClick={handleDateFilter}
        className="px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-opacity-50"
      >
        Filter by Date
      </button>
    </div>
  </div>

  {/* Quantity Filter Section */}
  <div className="flex flex-col md:flex-row gap-6 items-center">
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        Min Quantity Sold:
      </label>
      <input
        type="number"
        value={minQuantity}
        onChange={(e) => setMinQuantity(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Min Quantity"
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        Max Quantity Sold:
      </label>
      <input
        type="number"
        value={maxQuantity}
        onChange={(e) => setMaxQuantity(Number(e.target.value) || Infinity)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Max Quantity"
      />
    </div>
    <div className="self-end md:self-center">
      <button
        onClick={handleQuantityFilter}
        className="px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-opacity-50"
      >
        Filter by Quantity
      </button>
    </div>
  </div>

  {/* Product Selection Dropdown */}
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="dropdown-toggle px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-opacity-50"
    >
      Select Products
    </button>
    {isDropdownOpen && (
      <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-64">
        <h3 className="p-4 text-gray-700 font-bold border-b">Select Products</h3>
        <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
          {Object.keys(selectedProducts).map((productName) => (
            <div
              key={productName}
              className="flex items-center justify-between text-sm text-gray-600"
            >
              <label htmlFor={productName} className="cursor-pointer">
                {productName}
              </label>
              <input
                id={productName}
                type="checkbox"
                checked={selectedProducts[productName]}
                onChange={() => handleCheckboxChange(productName)}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>


 

      {/* Product Selection Dropdown */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <h3>Select Products to Include</h3>
          {Object.keys(selectedProducts).map((productName) => (
            <div key={productName}>
              <input
                type="checkbox"
                checked={selectedProducts[productName]}
                onChange={() => handleCheckboxChange(productName)}
              />
              <label>{productName}</label>
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      {Array.isArray(filteredData) && filteredData.length > 0 ? (
        <>
          <div style={{ margin: "20px 0" }}>
            <h3>Quantity Sold</h3>
            <Bar data={quantityChartData} />
          </div>

          <div style={{ margin: "20px 0" }}>
            <h3>Total Sale Value</h3>
            <Pie data={valueChartData} />
          </div>
        </>
      ) : (
        <p>No sales data available to display.</p>
      )}

      <style jsx>{`
        .dropdown-toggle {
          cursor: pointer;
        }

        .dropdown-menu {
          position: fixed;
          top: 20%;
          right: 0;
          width: 250px;
          background-color: #f4f4f4;
          border: 1px solid #ccc;
          padding: 10px;
          box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out;
        }
        
        .dropdown-menu.show {
          transform: translateX(0);
        }

        .dropdown-menu.hidden {
          transform: translateX(100%);
        }
      `}</style>
    </div>
  );
}

export default VisualSales;
