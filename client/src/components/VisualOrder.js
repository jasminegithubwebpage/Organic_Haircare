import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function VisualOrder() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [amountRange, setAmountRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/orders');
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filterOrders = () => {
      let result = orders;

      if (paymentFilter !== 'All') {
        result = result.filter(order => order.payment_method === paymentFilter);
      }

      result = result.filter(order => order.total_price >= amountRange[0] && order.total_price <= amountRange[1]);

      if (dateRange[0] && dateRange[1]) {
        const [startDate, endDate] = dateRange;
        result = result.filter(order => {
          const deliveryDate = new Date(order.delivery_date);
          return deliveryDate >= startDate && deliveryDate <= endDate;
        });
      }

      setFilteredOrders(result);
    };

    filterOrders();
  }, [orders, paymentFilter, amountRange, dateRange]);

  const getTotalPriceData = () => ({
    labels: filteredOrders.map(order => order.product_name),
    datasets: [{
      label: 'Total Price',
      data: filteredOrders.map(order => order.total_price),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  const getPaymentMethodData = () => {
    console.log("Filtered Orders:", filteredOrders); // Check if filteredOrders is populated
  
    const paymentCounts = filteredOrders.reduce((acc, order) => {
      if (order.payment_method) { // Check if payment_method exists
        acc[order.payment_method] = (acc[order.payment_method] || 0) + 1;
      }
      return acc;
    }, {});
  
    console.log("Payment Counts:", paymentCounts); // Check the output of paymentCounts
  
    return {
      labels: Object.keys(paymentCounts),
      datasets: [{
        data: Object.values(paymentCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }],
    };
  };
  

  const getQuantityData = () => ({
    labels: filteredOrders.map(order => order.product_name),
    datasets: [{
      label: 'Quantity Sold',
      data: filteredOrders.map(order => order.quantity),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  });

  const getDeliveryDateData = () => {
    const dateCounts = filteredOrders.reduce((acc, order) => {
      const date = order.delivery_date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(dateCounts),
      datasets: [{
        label: 'Orders Over Time',
        data: Object.values(dateCounts),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }],
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Orders Dashboard</h2>

      {/* Filters */}
      <div>
        <label>Payment Method:</label>
        <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="UPI">UPI</option>
          <option value="Pay On Delivery">Pay On Delivery</option>
        </select>

        <label>Amount Range:</label>
        <input
          type="number"
          value={amountRange[0]}
          onChange={(e) => setAmountRange([parseInt(e.target.value), amountRange[1]])}
        />
        <input
          type="number"
          value={amountRange[1]}
          onChange={(e) => setAmountRange([amountRange[0], parseInt(e.target.value)])}
        />

        <label>Delivery Date Range:</label>
        <DatePicker
          selected={dateRange[0]}
          onChange={(date) => setDateRange([date, dateRange[1]])}
          selectsStart
          startDate={dateRange[0]}
          endDate={dateRange[1]}
        />
        <DatePicker
          selected={dateRange[1]}
          onChange={(date) => setDateRange([dateRange[0], date])}
          selectsEnd
          startDate={dateRange[0]}
          endDate={dateRange[1]}
        />
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>Total Price by Product</h3>
          <Bar data={getTotalPriceData()} />
        </div>

        <div>
          <h3>Payment Method Distribution</h3>
          <Pie data={getPaymentMethodData()} />
        </div>

        <div>
          <h3>Quantity of Products Sold</h3>
          <Bar data={getQuantityData()} />
        </div>

        <div>
          <h3>Orders Over Time</h3>
          <Line data={getDeliveryDateData()} />
        </div>
      </div>
    </div>
  );
}

export default VisualOrder;
