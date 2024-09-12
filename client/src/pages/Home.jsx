// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header'; // Adjust the path as needed
import Footer from '../components/Footer'; // Adjust the path as needed
import HeroCarousel from '../components/HeroCarosel';
function Home() {
  return (
    <>
      <Header />
      <HeroCarousel/>
      <Footer />
    </>
  );
}

export default Home;