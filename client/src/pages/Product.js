import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import Card from '../components/Card';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); // Use the hook to navigate

  useEffect(() => {
    // Fetch products from the backend
    fetch("http://localhost:3002/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearchChange = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (id) => {
    // Navigate to the product details page when a product is clicked
    navigate(`/products/${id}`);
  };

  return (
    <div className="flex p-10">
      <div className="flex-grow">
        <h1 className="text-center mb-8">Our Products</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-2xl w-1/2"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <div className="w-1/4 ml-10"> {/* Sidebar for navigation */}
        <h2 className="text-center mb-4">Navigation</h2>
        <div className="flex flex-col items-center">
          <Link to="/mycart" className="mb-4 p-2 border rounded">My Cart</Link>
          <Link to="/myorders" className="mb-4 p-2 border rounded">My Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
