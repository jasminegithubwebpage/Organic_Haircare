import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hairProblem, setHairProblem] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [ingredient, setIngredient] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    fetch('http://localhost:3002/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Set initial filtered list as all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchTerm(keyword);
    applyFilters(keyword, hairProblem, priceRange, ingredient);
  };

  const handleHairProblemChange = (event) => {
    const selectedProblem = event.target.value;
    setHairProblem(selectedProblem);
    applyFilters(searchTerm, selectedProblem, priceRange, ingredient);
  };

  const handlePriceRangeChange = (event) => {
    const selectedPrice = event.target.value;
    setPriceRange(selectedPrice);
    applyFilters(searchTerm, hairProblem, selectedPrice, ingredient);
  };

  const handleIngredientChange = (event) => {
    const selectedIngredient = event.target.value;
    setIngredient(selectedIngredient);
    applyFilters(searchTerm, hairProblem, priceRange, selectedIngredient);
  };

  const applyFilters = (keyword, hairProblem, priceRange, ingredient) => {
    let filtered = products;

    // Apply text search if keyword is provided
    if (keyword) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      );
    }

    // Filter by Hair Problem if selected
    if (hairProblem) {
      filtered = filtered.filter((product) =>
        product.hairProblem === hairProblem
      );
    }

    // Filter by Price Range if selected
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      filtered = filtered.filter((product) =>
        !max
          ? product.price >= min
          : product.price >= min && product.price <= max
      );
    }

    // Filter by Ingredient if selected
    if (ingredient) {
      filtered = filtered.filter((product) =>
        product.ingredients && product.ingredients.includes(ingredient)
      );
    }

    setFilteredProducts(filtered); // Set the filtered products state
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-center mb-8 text-2xl font-bold">Our Products</h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-2xl w-1/2"
        />

        {/* Hair Problem Filter */}
        <select
          value={hairProblem}
          onChange={handleHairProblemChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Hair Problem</option>
          <option value="Dryness">Dry Hair</option>
          <option value="Dandruff">Dandruff</option>
          <option value="Hair Loss">Hair Loss</option>
          {/* Add more hair problems as needed */}
        </select>

        {/* Price Range Filter */}
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

        {/* Ingredient Filter */}
        <select
          value={ingredient}
          onChange={handleIngredientChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Ingredient</option>
          <option value="Argan Oil">Argan Oil</option>
          <option value="Coconut Oil">Coconut Oil</option>
          <option value="Tea Tree Oil">Tea Tree Oil</option>
          {/* Populate options dynamically if possible */}
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

      {/* Navigation Links */}
      <div className="flex flex-col items-center mt-10">
        <Link to="/mycart" className="mb-4 p-2 border rounded w-32 text-center">
          My Cart
        </Link>
        <Link to="/myorders" className="p-2 border rounded w-32 text-center">
          My Orders
        </Link>
      </div>
    </div>
  );
}

export default Product;
