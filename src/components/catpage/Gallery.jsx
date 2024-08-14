// Gallery.jsx
import React from 'react';
import './DogDetailViewPage.css'; // Add your own styles

const Gallery = ({ images }) => {
  return (
    <div className="gallery-container">
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Gallery ${index}`} className="gallery-image" />
      ))}
    </div>
  );
};

export default Gallery;
