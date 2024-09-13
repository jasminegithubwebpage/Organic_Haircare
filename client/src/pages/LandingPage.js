import React from "react";
import Navbar from "../components/Navbar";
// import HeroSection from '../components/HeroSection';
import Features from "../components/Features";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarosel";
import Header from "../components/Header";

function LandingPage() {
  const products = [
    { name: "Lavender Oil", info: "Relaxing oil", price: "$20.00" },
    { name: "Peppermint Oil", info: "Refreshing feel", price: "$15.00" },
    { name: "Peppermint Oil", info: "Refreshing feel", price: "$15.00" },
    { name: "Peppermint Oil", info: "Refreshing feel", price: "$15.00" },

    // Add more products as needed
  ];

  return (
    <div>
      {/* <Header/> */}
      <Navbar />
      {/* <HeroSection /> */}
      <HeroCarousel />
      <Features />
      <div className="bg-beige p-4">
        <ProductSection title="Trending" products={products} />
        <ProductSection title="Best Selling" products={products} />
        <ProductSection title="Today Deals" products={products} />
        <ProductSection title="Top sold" products={products} />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
