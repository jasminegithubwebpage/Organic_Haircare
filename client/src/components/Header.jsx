// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="py-4 text-lg font-Roboto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="https://via.placeholder.com/100x50.png?text=Logo" 
            alt="Organic Hair Care Solutions Logo"
            className="h-10 mr-4"
          />
          <h1 className="text-4xl font-bold font-Roboto ml-20">Organic Hair Care Solutions</h1>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-black-500 hover:text-blue-700">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-black-500 hover:text-blue-700">About</Link>
            </li>
            <li>
              <Link to="/contact" className="text-black-500 hover:text-blue-700">Contact</Link>
            </li>
            <li>
              <Link to="/products" className="text-black-500 hover:text-blue-700">Products</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
