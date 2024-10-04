import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-n100">
      <div className="bg-white rounded-2xl shadow-lg w-1/2 p-40 text-center">
        {/* Payment Status */}
        <h2 className="text-m500">Payment Successful</h2>
        <h3 className="text-n600 my-4">₹120.00</h3>

        {/* Order Summary */}
        <div className="my-6">
          <h3 className="text-n700">Order Summary</h3>
          <div className="flex justify-between my-2">
            <span>Product name</span>
            <span>120.00</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Quantity</span>
            <span>1</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between my-2">
            <span>Subtotal</span>
            <span>120.00</span>
          </div>
          <div className="flex justify-between my-2 text-n600">
            <span>Shipping cost</span>
            <span>free</span>
          </div>
          <div className="flex justify-between my-2">
            <span>GST</span>
            <span>10.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between my-2">
            <span>Total</span>
            <span>130.00</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-between text-n600 my-4">
          <span>Payment type</span>
          <span>Pay On Delivery</span>
        </div>

        {/* Invoice Button */}
        <button className="bg-m500 text-white py-5 px-10 rounded-2xl mt-4">
          <p className="lr20">Invoice</p>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
