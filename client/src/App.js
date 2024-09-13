import React from 'react';

import OrderTrack from "./components/OrderTrack";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        {/* Correct the path for OrderTrack */}
        <Route path="/order-track" element={<OrderTrack />} />
      </Routes>
    </Router>
  );
}

export default App;
