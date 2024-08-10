import React from 'react';
import { Link } from 'react-router-dom';
// import './ProductCard.css'; // Ensure the CSS file is imported

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  const { id, dogName, price, description, imageUrl } = product;

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-card-front">
          <img src={imageUrl || '/images/dog.jpg'} alt={dogName} />
          <h3>{dogName}</h3>
          <p className="price">Rs.{price}</p>
        </div>
        <div className="product-card-back">
          <p>{description}</p>
          <div className="details">
            <Link to={`/product/${id}`} className="details-btn">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
