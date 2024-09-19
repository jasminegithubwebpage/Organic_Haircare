import React, { useEffect, useState } from "react";

import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarosel";
import Card from "../components/Card";  // Import the Card component
import axios from 'axios';

function LandingPage() {
  const [products, setProducts] = useState({
    trending: [],
    bestSelling: [],
    todayDeals: [],
    topSold: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [trending, bestSelling, todayDeals, topSold] = await Promise.all([
          axios.get('http://localhost:3002/trending-products'),
        axios.get('http://localhost:3002/best-selling-products'),
        axios.get('http://localhost:3002/today-deals'),
        axios.get('http://localhost:3002/top-sold-products'),
          
        ]);

        setProducts({
          trending: trending.data,
          bestSelling: bestSelling.data,
          todayDeals: todayDeals.data,
          topSold: topSold.data,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
     {/* /// <Navbar /> */}
      <HeroCarousel />
      <Features />
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">Trending Products</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {products.trending.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-8 mb-4">Best Selling Products</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {products.bestSelling.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-8 mb-4">Today's Deals</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {products.todayDeals.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-8 mb-4">Top Sold Products</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {products.topSold.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;



