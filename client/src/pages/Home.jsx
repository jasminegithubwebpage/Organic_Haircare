// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header'; // Adjust the path as needed
import Footer from '../components/Footer'; // Adjust the path as needed

function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Organic Hair Care Solutions</h2>
        <p className="text-lg">
          We provide premium, homemade organic hair care products tailored to your needs.
          Our products are crafted with natural ingredients to ensure the best quality and effectiveness.
        </p>
        <p className="text-lg mt-4">
          Explore our website to learn more about our products and services.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;