import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from "../components/Card";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hairProblem, setHairProblem] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [ingredient, setIngredient] = useState('');

  const navigate = useNavigate();

  // Fetch all products on component mount
  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Fetch filtered products based on selected filters
  const fetchFilteredProducts = () => {
    let url = 'http://localhost:3002/products/filter?';

    // Construct URL with the selected filters
    if (hairProblem) url += `hairProblem=${encodeURIComponent(hairProblem)}&`;
    if (ingredient) url += `ingredient=${encodeURIComponent(ingredient)}&`;
    if (priceRange) url += `priceRange=${encodeURIComponent(priceRange)}`;

    // If no filter is applied, fetch all products
    if (!hairProblem && !ingredient && !priceRange) {
      setFilteredProducts(products); // Show all products
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log('Filtered products:', data);
          setFilteredProducts(data);
        })
        .catch((error) => console.error('Error fetching filtered products:', error));
    }
  };

  // Handle filter changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchFilteredProducts();
  };

  const handleHairProblemChange = (event) => {
    setHairProblem(event.target.value);
    fetchFilteredProducts();
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
    fetchFilteredProducts();
  };

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
    fetchFilteredProducts();
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="w-full flex justify-between items-center mb-8">
        {/* Navigation Link */}
        <Link
          to="/"
          className="text-m500 font-semibold px-4 py-2 rounded hover:underline"
        >
          Home
        </Link>

        {/* Title */}
        <h1 className="text-center text-4xl font-bold">Our Products</h1>

        {/* My Cart Link */}
        <div className="w-1/4 text-right">
          <Link
            to="/mycart"
            className="text-m500 font-semibold px-4 py-2 rounded hover:underline"
          >
            My Cart
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-2xl w-1/2"
        />

        <select
          value={hairProblem}
          onChange={handleHairProblemChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Hair Problem</option>
          <option value="Dryness">Dry Hair</option>
          <option value="Dandruff">Dandruff</option>
          <option value="Hair Loss">Hair Loss</option>
        </select>

        <select
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Price</option>
          <option value="0-10">Under $10</option>
          <option value="10-20">$10 - $20</option>
          <option value="20-30">$20 - $30</option>
          <option value="30-">Above $30</option>
        </select>

        <select
          value={ingredient}
          onChange={handleIngredientChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Ingredient</option>
          <option value="Argan Oil">Argan Oil</option>
          <option value="Coconut Oil">Coconut Oil</option>
          <option value="Tea Tree Oil">Tea Tree Oil</option>
        </select>
      </div>

      {/* Product Cards */}
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
  );
};

export default Product;
