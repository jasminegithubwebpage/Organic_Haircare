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
    fetch('http://localhost:3002/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
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

    if (keyword) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      );
    }

    if (hairProblem) {
      filtered = filtered.filter((product) =>
        product.hair_problem === hairProblem
      );
    }
    

    if (priceRange) {
      const [min, max] = priceRange.split('-');
      filtered = filtered.filter((product) =>
        !max
          ? product.price >= min
          : product.price >= min && product.price <= max
      );
    }

    if (ingredient) {
      filtered = filtered.filter((product) =>
        product.ingredient && product.ingredient.includes(ingredient)
      );
    }
    
    setFilteredProducts(filtered);
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
  <option value="Hair Loss">Hair Loss</option>
  <option value="Dandruff">Dandruff</option>
  <option value="Dry Hair">Dry Hair</option>
  <option value="Oily Scalp">Oily Scalp</option>
  <option value="Split Ends">Split Ends</option>
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
  <option value="Vitamin E">Vitamin E</option>
  <option value="Peppermint Oil">Peppermint Oil</option>
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
}

export default Product;
