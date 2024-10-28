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

function Visual3() {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    setFilteredData(filtered);
  };

  const quantityChartData = {
    labels: (filteredData || []).map((data) => `Product ${data.product_id}`),
    datasets: [
      {
        label: "Quantity Sold",
        data: (filteredData || []).map((data) => data.quantity_sold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const valueChartData = {
    labels: (filteredData || []).map((data) => `Product ${data.product_id}`),
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
      <h2>Product Sales Visualization</h2>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button onClick={handleDateFilter}>Filter by Date</button>
      </div>

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
    </div>
  );
}

export default Visual3;
