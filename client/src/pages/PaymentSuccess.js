import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {}; // Destructure only orderData

  if (!orderData) {
    return <p>No order details available.</p>; // Fallback if no order details
  }

  // Parse products JSON string
  const products = orderData.products ? JSON.parse(orderData.products) : [];

  // If there are products, map through them to show each one
  const productDetails = products.map((product, index) => (
    <div key={index} className="flex justify-between my-2">
      <p>Product {index + 1}:</p>
      <p>{product.name || "N/A"}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  ));

  const totalPrice = orderData.total_price;
  const paymentMethod = orderData.payment_method;
  const trackingID = orderData.tracking_id;
  const deliveryDate = orderData.delivery_date;

  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 10, 10);

    doc.setFontSize(12);

    // Add each product's details in the invoice
    products.forEach((product, index) => {
      doc.text(`Product ${index + 1}: ${product.name || "N/A"}`, 10, 20 + index * 10);
      doc.text(`Quantity: ${product.quantity}`, 10, 30 + index * 10);
    });

    doc.text(`Total Amount: ₹${totalPrice}`, 10, 40 + products.length * 10);
    doc.text(`Payment Method: ${paymentMethod}`, 10, 50 + products.length * 10);
    doc.text(`Tracking ID: ${trackingID}`, 10, 60 + products.length * 10);
    doc.text(`Delivery Date: ${deliveryDate}`, 10, 70 + products.length * 10);

    doc.save("invoice.pdf");
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-xl mb-2">Thank you for your order.</p>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Order Summary</h3>

          {/* Display details for each product */}
          {productDetails}

          <div className="flex justify-between my-2">
            <p>Total Price:</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Payment Method:</p>
            <p>{paymentMethod}</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Tracking ID:</p>
            <p>{trackingID}</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Estimated Delivery Date:</p>
            <p>{deliveryDate}</p>
          </div>
        </div>

        <button
          onClick={generateInvoice}
          className="mt-6 bg-m500 text-white p-2 rounded w-full"
        >
          Download Invoice
        </button>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-m500 text-white p-2 rounded w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
