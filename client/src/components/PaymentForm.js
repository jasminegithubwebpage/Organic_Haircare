import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const PaymentForm = () => {
  const location = useLocation(); // Retrieve data passed via state
  const { product, quantity: initialQuantity } = location.state || {}; // Destructure product and quantity
  const [quantity, setQuantity] = useState(initialQuantity || 1); // Default to 1 if not provided
  const productPrice = Number(product?.price) || 0;
  const totalPrice = quantity * productPrice;
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // Default to UPI
  const navigate = useNavigate();

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  // Render a loading message if no product is passed via state
  if (!product) return <p>Loading payment details...</p>;

  // Generate a random tracking ID (you can customize the format)
  const trackingID = `TRACK-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  // Get today's date and add 7 days for the delivery date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  // Format the delivery date to a readable string (optional)
  const formattedDeliveryDate = deliveryDate.toISOString().split("T")[0]; // YYYY-MM-DD format

  // Prepare order data
  const orderData = {
    product_id: product.id, // Ensure product.id exists
    quantity,
    product_name: product.name,
    total_price: totalPrice,
    payment_method: paymentMethod,
    tracking_id: trackingID,
    delivery_date: formattedDeliveryDate, // Use the generated delivery date
  };

  // Handle proceed to save order data
  const handleProceed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/orders",
        orderData
      );
      console.log("Order saved successfully:", response.data);

      // Navigate to the payment success page with order details
      navigate("/payment-success", { state: { orderData } });
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };
  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row justify-center gap-6 items-center">
      {/* Payment Form Section */}
      <div className="bg-b100 p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProceed();
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded col-span-2"
            />
          </div>
          <div className="mt-4">
            {paymentMethod === "UPI" && (
              <input
                type="text"
                placeholder="UPI"
                className="border p-2 rounded w-full"
              />
            )}
            {/* <div className="mt-2 text-center">Or</div> */}
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-m500 text-white p-2 rounded"
          >
            Proceed
          </button>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-1/4 md:w-1/4 mt-8 md:mt-0">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Total Amount</h3>
          <p className="text-3xl font-bold mb-4">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-bold">Order Summary</h4>
          <div className="flex justify-between p-2">
            <p>Product name:</p>
            <p>{product.name}</p>
          </div>

          <div className="flex justify-between p-2">
            <p>Price per item:</p>
            <p>${productPrice.toFixed(2)}</p>
          </div>

          {/* Quantity Control */}
          <div className="flex justify-between p-2 items-center">
            <p>Quantity:</p>
            <div className="flex items-center">
              <button onClick={handleDecrement} className="px-2">
                -
              </button>
              <p className="mx-2">{quantity}</p>
              <button onClick={handleIncrement} className="px-2">
                +
              </button>
            </div>
          </div>

          <hr />

          <div className="flex justify-between p-2">
            <p>Subtotal:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between p-2">
            <p>Shipping cost:</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between p-2">
            <p>GST:</p>
            <p>${(0.1 * totalPrice).toFixed(2)}</p>
          </div>

          <hr />

          <div className="flex justify-between p-2">
            <p>Total:</p>
            <p>${(totalPrice + 0.1 * totalPrice).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="Pay On Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />{" "}
            Pay On Delivery
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />{" "}
            UPI
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
