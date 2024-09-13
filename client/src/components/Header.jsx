// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="container-md bg-m500 py-4 text-lg font-Roboto text-white">
      <div className="flex justify-around  items-center">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img 
            src="#" 
            alt="Organic Hair Care Solutions Logo"
            className="h-10 mr-4"
          /> */}
          <h1 className="text-4xl font-bold font-Roboto ml-20">Organic Hair Care Solutions</h1>
        </div>

        {/* Navigation Links */}
        <nav>
      <ul className="flex space-x-4 navList">
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
          <Link to="/products" className="text-black-500 hover:text-blue-700">Product</Link>
        </li>
      </ul>
    </nav>

        {/* icon */}
        {/* <div className="flex items-center">
          <img 
            src="#" 
            alt="Organic Hair Care Solutions icon1"
            className="h-10 mr-4"
          />
          <img 
            src="#" 
            alt="Organic Hair Care Solutions icon1"
            className="h-10 mr-4"
          />
          <img 
            src="#" 
            alt="Organic Hair Care Solutions icon1"
            className="h-10 mr-4"
          />
        </div> */}


      </div>
    </header>
  );
}

export default Header;


