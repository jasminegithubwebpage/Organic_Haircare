import React from "react";

// import Navbar from "./Navbar";
// import Footer from "./Footer";

function PaymentForm() {
  return (
    <div className="container mx-auto p-10 items-center">
      {/* Form Section */}
      <h1 className="py-6 text-m500">Payment Summary</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <div className="bg-b100 p-8 rounded-2xl shadow-md w-full md:w-1/2 h-full">
          <h2 className="mb-6">Payment</h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-4 rounded-2xl"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-4 rounded-2xl"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-4 rounded-2xl"
              />
              <textarea
                type="text"
                placeholder="Address"
                className="border p-4 rounded-2xl col-span-2"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="UPI"
                className="border p-4 rounded-2xl w-full"
              />
            </div>
            <button className="mt-4 w-full bg-b500 text-white p-4 rounded-2xl">
              Proceed
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="bg-n200 p-8 rounded-2xl shadow-md w-1/4 md:w-1/4 mt-8 md:mt-0 h-full">
          <div className="text-center">
            <h2 className="mb-4">Total Amount</h2>
            <p className="r16 mb-4">₹120.00</p>
          </div>

          <div className="mb-4">
            <h3>Order Summary</h3>

            <div className="flex justify-between p-2">
              <p className="r16">Product name:</p>
              <p className="r16">₹120.00</p>
            </div>

            <div className="flex justify-between p-2">
              <p className="r16">Quantity:</p>
              <p className="r16">1</p>
            </div>

            <hr></hr>

            <div className="flex justify-between p-2">
              <p className="r16">Subtotal:</p>
              <p className="r16">₹120.00</p>
            </div>

            <div className="flex justify-between p-2">
              <p className="r16">Shipping cost:</p>
              <p className="r16">Free</p>
            </div>

            <div className="flex justify-between p-2">
              <p className="r16">GST:</p>
              <p className="r16">₹10.00</p>
            </div>

            <hr></hr>

            <div className="flex justify-between p-2">
              <p className="r16">Total:</p>
              <p className="r16">₹130.00</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Pay On
              Delivery
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" checked /> UPI
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
