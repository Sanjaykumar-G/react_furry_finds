import React from 'react';
// import './ProductCard.css'; // Ensure the CSS file is imported

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  const { dogName, price, description, imageUrl } = product;

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-card-front">
          <img src={imageUrl || '/images/dog.jpg'} alt={dogName} />
          <h3>{dogName}</h3>
          <p className="price">Rs.{price}</p>
        </div>
        <div className="product-card-back">
          {/* <h3>{dogName}</h3> */}
          <p>{description}</p>
          {/* <p className="price">Rs.{price}</p> */}
          <div className="details">
            <button className="details-btn">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
