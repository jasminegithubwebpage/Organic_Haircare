import React from "react";

function PaymentForm() {
  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row justify-center gap-4 items-center">
      {/* Form Section */}
      <div className="bg-b100 p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
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
            <input
              type="text"
              placeholder="UPI"
              className="border p-2 rounded w-full"
            />
            <div className="mt-2 text-center">Or</div>
          </div>
          <button className="mt-4 w-full bg-brownishgold text-white p-2 rounded">
            Proceed
          </button>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-1/4 md:w-1/4 mt-8 md:mt-0">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Total Amount</h3>
          <p className="text-3xl font-bold mb-4">₹120.00</p>
        </div>

        <div className="mb-4">
          <h4 className="font-bold">Order Summary</h4>

            <div className="flex justify-between p-2">
              <p>Product name:</p>
              <p>₹120.00</p>
            </div>

            <div className="flex justify-between p-2">
              <p>Quantity:</p>
              <p>1</p>
            </div>

            <hr></hr>

            <div className="flex justify-between p-2">
              <p>Subtotal:</p>
              <p>₹120.00</p>
            </div>

            <div className="flex justify-between p-2">
              <p>Shipping cost:</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between p-2">
              <p>GST:</p>
              <p>₹10.00</p>
            </div>

            <hr></hr>

          <div className="flex justify-between p-2">
            <p>Total:</p>
            <p>₹130.00</p>
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
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" /> Net Banking
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
