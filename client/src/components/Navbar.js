import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-m500 py-4 px-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white hover:text-y500 active:text-y500">
          <Link to="/">HairCare</Link>
        </h1>
        <div className="space-x-4">
          <ul className="flex flex-row gap-10">
            <li className="text-white hover:text-y500 active:text-y500 lr16">
              <Link to="/products">Our Products</Link>
            </li>
            <li className="text-white hover:text-y500 active:text-y500 lr16">
              <Link to="/about">About us</Link>
            </li>
            <li className="text-white hover:text-y500 active:text-y500 lr16">
              <Link to="/services">Services</Link>
            </li>
            <li className="text-white hover:text-y500 active:text-y500 lr16">
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
