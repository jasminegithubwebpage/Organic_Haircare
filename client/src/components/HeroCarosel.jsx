import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    { src: '/assets/images/backgrounds/t1.webp', alt: '1st slide' },
    { src: '/assets/images/backgrounds/t2.jpg', alt: 'Second slide' },
    { src: '/assets/images/backgrounds/t3.jpg', alt: 'Third slide' },
  ];

  return (
    <Slider {...settings} className="container-md heroCarosel">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={image.alt} style={{ width: '100%', height: '700px' }} />
        </div>
      ))}
    </Slider>
  );
}

export default HeroCarousel;
