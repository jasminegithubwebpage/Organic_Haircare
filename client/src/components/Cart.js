import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/cart");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching cart details", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full p-4 gap-4 border-red-600">
      <div className="w-1/2 border-red-600 cart-items">
        <div className="flex gap-6 p-4 cart-item ">
          <div>
            <img src="/assets/2.jpg" alt="sample" className="proImg" />
          </div>
          <div className="justify-between py-1 w-full product-info">
            <div className="flex justify-between">
              <h4 className="text-m500">Product name</h4>
              <h4 className="text-m500">₹ 99.99</h4>
            </div>

            <div className="flex py-1 justify-between">
              <div className="flex gap-8">
                <p>₹ 99.99</p>
                <p>In stock</p>
              </div>

              <div>
                <p>
                  <span className="pe-2">
                    <i class="fa-solid fa-share-nodes"></i>
                  </span>
                  Share
                </p>
              </div>
            </div>

            <div className="gap-4 py-1 quantity-control">
              <label>Quantity: </label>
              <input type="number" defaultValue={1} min={1} />
            </div>

            <div className="flex py-1 gap-2">
              <button className="save-btn">
                <span className="pe-2">
                  <i class="fa-regular fa-heart"></i>
                </span>
                Save
              </button>
              <button className="delete-btn gap-2">
                <span className="pe-2">
                  <i class="fa-solid fa-trash"></i>
                </span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-1/2 border-red-600">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8 md:mt-0">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Items Price</h3>
            <p className="text-3xl font-bold mb-4">₹ 299.97</p>
          </div>

          <div className="mb-4 w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product 1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                {/* {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.rate}</td>
                    <td>{product.price}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>

            <hr />

            <div className="flex justify-between p-2">
              <p>Subtotal:</p>
              <p>₹ 1</p>
            </div>

            <div className="flex justify-between p-2">
              <p>Shipping cost:</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between p-2">
              <p>GST:</p>
              <p>₹ 10</p>
            </div>

            <hr />

            <div className="flex justify-between p-2">
              <p>Total:</p>
              <p>₹ 2299</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
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
        </div>
      </div> */}
    </div>
  );
};

export default Cart;
