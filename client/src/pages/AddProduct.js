import { useState } from 'react';
import axios from 'axios'; // Import Axios

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    info: '',
    price: '',
    image_url: '',
    count: '',
    discount: '',
    added_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', product.name);
    formData.append('info', product.info);
    formData.append('price', product.price);
    formData.append('image_url', e.target.image_url.files[0]); // Handle image file
    formData.append('count', product.count);
    formData.append('discount', product.discount);
    formData.append('added_date', product.added_date);
  
    try {
      const response = await axios.post('http://localhost:3002/AddProducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added:', response.data);
      alert('Product added successfully!');
      setProduct({
        name: '',
        info: '',
        price: '',
        image_url: '',
        count: '',
        discount: '',
        added_date: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">
            Image 
          </label>
          <input
            type="file"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="added_date">
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

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
