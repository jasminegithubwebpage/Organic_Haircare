import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../pages/UserContext";

const PaymentForm = () => {
  const location = useLocation();
  const { productData, totalPrice: initialTotalPrice } = location.state || {};
  const { user } = useUser();
  const userId = user?.id || null;
  const navigate = useNavigate();
  console.log("Product Data:", productData);

  const [address, setAddress] = useState({
    area: "",
    city: "",
    state: "",
    country: "",
    zipcode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Calculate total price from product array
  const calculatedTotalPrice = productData
    ? productData.reduce((total, product) => total + Number(product.price || 0), 0)
    : 0;

  const totalPrice = initialTotalPrice || calculatedTotalPrice;
  const productNames = productData && productData.length > 0
  ? productData.length === 1
    ? productData[0].name // If there's only one product, return its name directly
    : productData.map((products) => products.name).join(", ") // If multiple products, join their names
  : "";



  useEffect(() => {
    if (!productData || !userId) {
      // Navigate back if data is missing
      navigate("/mycart");
    }
  }, [productData, userId, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const trackingID = `TRACK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toISOString().split("T")[0];

  // const orderData = {
  //   user_id: userId,
  //   products: productData,
  //   total_price: totalPrice,
  //   payment_method: paymentMethod,
  //   tracking_id: trackingID,
  //   delivery_date: formattedDeliveryDate,
  //   address: `${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.zipcode}`,
  //   order_date: new Date().toISOString().split("T")[0]
  // };

  const handleProceed = async () => {
    try {
      const orderData = {
        user_id: userId,
        products: JSON.stringify(
          productData.map((product) => ({
            id: product.id,
            name:product.name,
            quantity: product.quantity
          }))
        ),  // Ensure this is correctly stringified
        total_price: totalPrice,
        payment_method: paymentMethod,
        tracking_id: trackingID,
        delivery_date: formattedDeliveryDate,
        address: `${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.zipcode}`,
        order_date: new Date().toISOString().split("T")[0],
      };
  
      // Ensure that you send the correct object as the body
      const response = await axios.post("http://localhost:3002/orders", orderData, {
        headers: {
          "Content-Type": "application/json" // Ensure the content type is JSON
        }
      });
  
      console.log("Order saved successfully:", response.data);
      console.log(orderData);
      console.log(productNames);
      navigate("/payment-success", { state: { orderData, productNames } });
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };
  
  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row justify-center gap-6 items-center">
      <div className="bg-b100 p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleProceed(); }}>
          <div className="grid grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="border p-2 rounded" />
            <input type="text" placeholder="Phone" className="border p-2 rounded" />
            <input type="email" placeholder="Email" className="border p-2 rounded" />
            <input type="text" placeholder="Area" name="area" value={address.area} onChange={handleAddressChange} className="border p-2 rounded" />
            <input type="text" placeholder="City" name="city" value={address.city} onChange={handleAddressChange} className="border p-2 rounded" />
            <input type="text" placeholder="State" name="state" value={address.state} onChange={handleAddressChange} className="border p-2 rounded" />
            <input type="text" placeholder="Country" name="country" value={address.country} onChange={handleAddressChange} className="border p-2 rounded" />
            <input type="text" placeholder="Zip Code" name="zipcode" value={address.zipcode} onChange={handleAddressChange} className="border p-2 rounded" />
          </div>

          <div className="mt-4">
            {paymentMethod === "UPI" && (
              <input type="text" placeholder="UPI" className="border p-2 rounded w-full" />
            )}
          </div>
          <button type="submit" className="mt-4 w-full bg-m500 text-white p-2 rounded">
            Proceed
          </button>
        </form>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-1/4 md:w-1/4 mt-8 md:mt-0">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Total Amount</h3>
          <p className="text-3xl font-bold mb-4">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-bold">Order Summary</h4>
          <div className="flex justify-between p-2">
            <p>Products:</p>
            <p>{productNames}</p>
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
            <input type="radio" name="payment" value="Pay On Delivery" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" /> Pay On Delivery
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" /> UPI
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
