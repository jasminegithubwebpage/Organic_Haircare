import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function PaymentForm() {
  // Retrieve product data passed via state
  const location = useLocation();
  const { product, quantity: initialQuantity } = location.state || {}; // Destructure product and quantity from state

  // Quantity and price state
  const [quantity, setQuantity] = useState(initialQuantity || 1); // Initialize with passed quantity or default to 1
  const productPrice = product ? product.price : 0;
  const totalPrice = quantity * productPrice;

  // Increment and decrement quantity
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row justify-center gap-4 items-center">
      {/* Form Section */}
      <div className="bg-b100 p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="border p-2 rounded" />
            <input type="text" placeholder="Phone" className="border p-2 rounded" />
            <input type="email" placeholder="Email" className="border p-2 rounded" />
            <input type="text" placeholder="Address" className="border p-2 rounded col-span-2" />
          </div>
          <div className="mt-4">
            <input type="text" placeholder="UPI" className="border p-2 rounded w-full" />
            <div className="mt-2 text-center">Or</div>
          </div>
          <button className="mt-4 w-full bg-brownishgold text-white p-2 rounded">Proceed</button>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-1/4 md:w-1/4 mt-8 md:mt-0">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Total Amount</h3>
          <p className="text-3xl font-bold mb-4">₹{totalPrice}</p>

        </div>

        <div className="mb-4">
          <h4 className="font-bold">Order Summary</h4>

          <div className="flex justify-between p-2">
            <p>Product name:</p>
            <p>{product ? product.name : "N/A"}</p>
          </div>

          <div className="flex justify-between p-2">
            <p>Price per item:</p>
            <p>₹{productPrice.toFixed(2)}</p>
          </div>

          {/* Quantity Control */}
          <div className="flex justify-between p-2 items-center">
            <p>Quantity:</p>
            <div className="flex items-center">
              <button onClick={handleDecrement} className="px-2">-</button>
              <p className="mx-2">{quantity}</p>
              <button onClick={handleIncrement} className="px-2">+</button>
            </div>
          </div>

          <hr></hr>

          <div className="flex justify-between p-2">
            <p>Subtotal:</p>
            <p>₹{totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between p-2">
            <p>Shipping cost:</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between p-2">
            <p>GST:</p>
            <p>₹{(0.1 * totalPrice).toFixed(2)}</p>
          </div>

          <hr></hr>

          <div className="flex justify-between p-2">
            <p>Total:</p>
            <p>₹{(totalPrice + 0.1 * totalPrice).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" /> Pay On Delivery
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" checked /> UPI
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" /> Net Banking
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
