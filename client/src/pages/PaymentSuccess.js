import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, orderData } = location.state || {}; // Correct destructuring

  if (!orderData) {
    return <p>No order details available.</p>; // Fallback if no order details
  }

  const {
    quantity,
    total_price: totalPrice,
    payment_method: paymentMethod,
    tracking_id: trackingID,
    delivery_date: deliveryDate,
  } = orderData;

  const generateInvoice = () => {
    const invoiceContent = `
      Invoice\n
      Product Name: ${productName || "N/A"}\n
      Quantity: ${quantity}\n
      Total Amount: ₹${totalPrice}\n
      Payment Method: ${paymentMethod}\n
      Tracking ID: ${trackingID}\n
      Delivery Date: ${deliveryDate}\n
    `;

    const blob = new Blob([invoiceContent], { type: "application/pdf" }); // Correct type
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.pdf";
    link.click();
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-xl mb-2">Thank you for your order.</p>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Order Summary</h3>
          <div className="flex justify-between my-2">
            <p>Product:</p>
            <p>{productName || "N/A"}</p> {/* Correctly display product name */}
          </div>
          <div className="flex justify-between my-2">
            <p>Quantity:</p>
            <p>{quantity}</p>
          </div>
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
