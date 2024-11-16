import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../pages/UserContext";

const PaymentForm = () => {
  const location = useLocation();
  const { product, quantity: initialQuantity } = location.state || {};
  const { user } = useUser();
  const userId = user?.id || null;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const productPrice = Number(product?.price) || 0;
  const totalPrice = quantity * productPrice;
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Form fields state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [upi, setUpi] = useState("");
  const [address, setAddress] = useState({
    area: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Ensure necessary data is available
  useEffect(() => {
    if (!product || !userId) {
      navigate("/mycart");
    }
  }, [product, userId, navigate]);

  // Validation function
  const validate = () => {
    let validationErrors = {};

    if (!name) validationErrors.name = "Name is required.";
    if (!phone) validationErrors.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(phone))
      validationErrors.phone = "Phone number must be 10 digits.";

    if (!email) validationErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      validationErrors.email = "Please enter a valid email address.";

    if (!address.area || !address.city || !address.state || !address.zipcode) {
      validationErrors.address = "Complete address is required.";
    }

    if (paymentMethod === "UPI" && !upi)
      validationErrors.upi = "UPI ID is required for UPI payments.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const trackingID = `TRACK-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toISOString().split("T")[0];

  const orderData = {
    user_id: userId,
    product_id: product?.id,
    product_name: product?.name,
    quantity,
    total_price: totalPrice,
    payment_method: paymentMethod,
    tracking_id: trackingID,
    delivery_date: formattedDeliveryDate,
    address: `${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.zipcode}`,
    order_date: new Date().toISOString().split("T")[0],
  };

  const handleProceed = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:3002/orders", orderData);
      console.log("Order saved successfully:", response.data);
      navigate("/payment-success", { state: { orderData, productName: product.name } });
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  if (!product) return <p>Loading payment details...</p>;

  return (
    <div className="container mx-auto py-12 flex flex-col md:flex-row justify-center gap-6 items-center">
      <div className="bg-b100 p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProceed();
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="col-span-2">
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={address.area}
                onChange={handleAddressChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="border p-2 rounded w-full mt-2"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="border p-2 rounded w-full mt-2"
              />
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={address.zipcode}
                onChange={handleAddressChange}
                className="border p-2 rounded w-full mt-2"
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
          </div>
          <div className="mt-4">
            {paymentMethod === "UPI" && (
              <div>
                <input
                  type="text"
                  placeholder="UPI ID"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                {errors.upi && <p className="text-red-500">{errors.upi}</p>}
              </div>
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
            <p>{product?.name}</p>
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
      </div>
    </div>
  );
};

export default PaymentForm;
