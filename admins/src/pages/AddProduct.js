import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    info: "",
    price: "",
    image_url: null,
    count: "",
    discount: "",
    added_date: "",
  });
  
  const [message, setMessage] = useState(""); // State for displaying messages

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_url") {
      const file = files[0];
      setProduct({
        ...product,
        image_url: file,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("info", product.info);
    formData.append("price", product.price);
    formData.append("image_url", product.image_url);
    formData.append("count", product.count);
    formData.append("discount", product.discount);
    formData.append("added_date", product.added_date);

    try {
      const response = await axios.post(
        "http://localhost:3002/AddProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added:", response.data);
      setMessage("Product added successfully!");

      // Reset the form after successful submission
      setProduct({
        name: "",
        info: "",
        price: "",
        image_url: null,
        count: "",
        discount: "",
        added_date: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      {/* Display success or error message */}
      {message && <p className="text-center text-lg mb-4 text-green-500">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Product Name Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Product Info Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="info"
          >
            Product Info
          </label>
          <textarea
            name="info"
            value={product.info}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Image Upload Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image_url"
          >
            Product Image
          </label>
          <input
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          {/* Image Preview */}
          {product.image_url && (
            <img
              src={URL.createObjectURL(product.image_url)}
              alt="Preview"
              className="mt-2 max-w-xs"
            />
          )}
        </div>

        {/* Count Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="count"
          >
            Count
          </label>
          <input
            type="number"
            name="count"
            value={product.count}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Discount Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="discount"
          >
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Added Date Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="added_date"
          >
            Added Date
          </label>
          <input
            type="date"
            name="added_date"
            value={product.added_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
