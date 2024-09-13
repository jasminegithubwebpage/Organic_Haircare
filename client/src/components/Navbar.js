import React from 'react';

function Navbar() {
  return (
    <nav className="bg-m500 py-4 px-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-white">habitual</a>
        <div className="space-x-4">
          <a href="/products" className="text-white hover:text-gray-800">Our Products</a>
          <a href="/about" className="text-white hover:text-gray-800">About Us</a>
          <a href="/services" className="text-white hover:text-gray-800">Services</a>
          <a href="/contact" className="text-white hover:text-gray-800">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
