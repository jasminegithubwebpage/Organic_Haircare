import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser }  from "../pages/UserContext";
//import { useContext } from 'react';

const PaymentForm = () => {
  const location = useLocation();
  const { product, quantity: initialQuantity } = location.state || {};
  const { user } = useUser();  // Use 'user' instead of 'currentUser'
  console.log('Order Detail',product);
  console.log('Current in Payment page User:', user); 
  const userId = user?.id || null;  // Safely access the ID
  
  if (!userId) {
    console.warn('User ID not found.');
  } else {
    console.log('User ID:', userId);
  }
  
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const productPrice = Number(product?.price) || 0;
  const totalPrice = quantity * productPrice;
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    area: "",
    city: "",
    state: "",
    country: "",
    zipcode: ""
  });

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  if (!product) return <p>Loading payment details...</p>;

  const trackingID = `TRACK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0];

  // const orderData = {
  //   user_id: currentUser ? currentUser.id : null, // Add user ID here
  //   product_id: product.id,
  //   quantity,
  //   total_price: totalPrice,
  //   payment_method: paymentMethod,
  //   tracking_id: trackingID,
  //   delivery_date: formattedDeliveryDate,
  //   address: `${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.zipcode}`,
  //   order_date: new Date().toISOString().split('T')[0]
  // };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = async () => {
    const orderData = {
      user_id: userId, 
      product_id: product.id,
      product_name: product.name,  // Add product name here
      quantity,
      total_price: totalPrice,
      payment_method: paymentMethod,
      tracking_id: trackingID,
      delivery_date: formattedDeliveryDate,
      address: `${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.zipcode}`,
      order_date: new Date().toISOString().split('T')[0]
  };
  
    try {
        const response = await axios.post('http://localhost:3002/orders', orderData);
        console.log('Order saved successfully:', response.data);
        navigate('/payment-success', { state: { orderData, productName: product.name } });

    } catch (error) {
        console.error('Error saving order details:', error);
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
            <p>Product name:</p>
            <p>{product.name}</p>
          </div>

          <div className="flex justify-between p-2">
            <p>Price per item:</p>
            <p>${productPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between p-2 items-center">
            <p>Quantity:</p>
            <div className="flex items-center">
              <button onClick={handleDecrement} className="px-2">-</button>
              <p className="mx-2">{quantity}</p>
              <button onClick={handleIncrement} className="px-2">+</button>
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
