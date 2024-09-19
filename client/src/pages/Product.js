import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Card from "../components/Card";
// Inside your Product component
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
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-lg w-1/2"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)} // Add onClick event to each product
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );

}

export default Product;
 

  