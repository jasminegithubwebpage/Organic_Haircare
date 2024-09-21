import React, { useEffect, useState } from "react";
import Features from "../components/Features";
import HeroCarousel from "../components/HeroCarosel";
import Card from "../components/Card"; // Import the Card component
import axios from "axios";
import Why from "./Why";
import Mail from "../components/Mail";

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
          axios.get("http://localhost:3002/trending-products"),
          axios.get("http://localhost:3002/best-selling-products"),
          axios.get("http://localhost:3002/today-deals"),
          axios.get("http://localhost:3002/top-sold-products"),
        ]);

        setProducts({
          trending: trending.data,
          bestSelling: bestSelling.data,
          todayDeals: todayDeals.data,
          topSold: topSold.data,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <HeroCarousel />
      <Features />
      <Why />
      <div className="grid grid-cols-2 justify-center">
        <div>
          <h2 className="text-m500 ps-40 pb-4">Trending Products</h2>
          <div className="grid grid-cols-2 gap-10 ps-40 pe-40 pb-40">
            {products.trending.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-m500 pe-40 pb-4">Best Selling Products</h2>
          <div className="grid grid-cols-2 gap-10 pe-80 pb-40">
            {products.bestSelling.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-m500 ps-40 pb-4">Today's Deals</h2>
          <div className="grid grid-cols-2 gap-10 ps-40 pe-40 pb-40">
            {products.todayDeals.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-m500 pe-40 pb-4">Top Sold Products</h2>
          <div className="grid grid-cols-2 gap-10 pe-80 pb-40">
            {products.topSold.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Mail />
    </div>
  );
}

export default LandingPage;
