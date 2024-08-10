import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DiscountCarousel.css'; // Import CSS

const DiscountCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="discount-carousel">
      <div className="carousel-wrapper">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image.src} alt={image.alt} className="carousel-image" />
            </div>
          ))}
        </div>
        {/* Navigation controls */}
        <button className="carousel-prev" onClick={prevSlide}>‹</button>
        <button className="carousel-next" onClick={nextSlide}>›</button>
      </div>
    </div>
  );
};

DiscountCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DiscountCarousel;
