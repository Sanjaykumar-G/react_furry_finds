import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ItemViewPage.css'; // Import the updated CSS
import { Header, Footer } from '../Homepage';
import Cart from '../cart/Cart'; // Import Cart component

// Importing icon images
import qualityIcon from '../../assets/icons/quality.png';
import durabilityIcon from '../../assets/icons/durability.png';
import sizesIcon from '../../assets/icons/sizes.png';

// ItemViewPage.jsx

const ItemViewPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('2kg'); // Default size
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  if (!item) {
    return <div>No item details available</div>;
  }

  const sizeOptions = {
    '2kg': item.price2kg,
    '5kg': item.price5kg,
    '10kg': item.price10kg,
    '20kg': item.price20kg,
  };

  const selectedPrice = sizeOptions[selectedSize] || 0;

  const handleAddToCart = () => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === selectedSize);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id && cartItem.size === selectedSize ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity, size: selectedSize, price: selectedPrice }]);
    }
    setShowCart(true); // Show the cart when an item is added
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="item-view-page">
      <Header />
      <header className="item-view-header">
        <h1 className="item-view-title">{item.name}</h1>
      </header>
      <section className="item-view-details">
        <div className="item-view-image-container">
          <img src={item.image} alt={item.name} className="item-view-image" />
          <div className="item-view-image-thumbnails">
            {/* Example thumbnails */}
            <div className="item-view-thumbnail">
              <img src={item.image} alt="Thumbnail 1" />
            </div>
            <div className="item-view-thumbnail">
              <img src={item.image} alt="Thumbnail 2" />
            </div>
          </div>
        </div>
        <div className="item-view-info">
          <h1 className="item-view-title">{item.name}</h1>
          <p className="item-view-price">
            <span className="item-view-new-price">${selectedPrice.toFixed(2)}</span>
            {item.discountPrice > selectedPrice && (
              <span className="item-view-old-price">${item.discountPrice.toFixed(2)}</span>
            )}
          </p>
          <p className="item-view-rating">
            <strong>Rating:</strong> {'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}
          </p>
          <div className="item-view-size">
            <label htmlFor="size">Size:</label>
            <div className="item-view-size-options">
              {Object.keys(sizeOptions).map(size => (
                <div
                  key={size}
                  className={`item-view-size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className="item-view-quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min="1"
              className="item-view-quantity-input"
            />
          </div>
          <div className="item-view-buttons">
            <button className="item-view-add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="item-view-checkout-button">
              Checkout
            </button>
          </div>
          <div className="item-view-coupon">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="item-view-coupon-input"
            />
            <button className="item-view-apply-coupon-button" onClick={handleApplyCoupon}>
              Apply Coupon
            </button>
            {discountApplied && <p className="item-view-coupon-message">Coupon applied! Enjoy your discount.</p>}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="item-view-description-container">
        <h2>Description</h2>
        <div className="item-view-description">
          <div className="item-view-description-item">
            <img src={qualityIcon} alt="High Quality" className="item-view-description-icon" />
            <div className="item-view-description-text">
              <h3>High Quality</h3>
              <p>This product is made from premium, high-grade materials that ensure exceptional durability and long-term performance. The quality craftsmanship guarantees that it will withstand daily use and maintain its integrity over time.</p>
              <p>Key Features:</p>
              <ul>
                <li>Made with top-notch materials for enhanced longevity.</li>
                <li>Rigorous quality control checks during manufacturing.</li>
                <li>Resistant to wear and tear for a longer lifespan.</li>
              </ul>
            </div>
          </div>
          <div className="item-view-description-item">
            <img src={durabilityIcon} alt="Durable" className="item-view-description-icon" />
            <div className="item-view-description-text">
              <h3>Durable</h3>
              <p>Designed to be incredibly durable, this product can handle the rigors of everyday use without compromising on performance. It is built to resist damage and maintain its functionality even under challenging conditions.</p>
              <p>Key Features:</p>
              <ul>
                <li>Constructed with high-strength materials.</li>
                <li>Engineered to resist impacts and rough handling.</li>
                <li>Perfect for both indoor and outdoor environments.</li>
              </ul>
            </div>
          </div>
          <div className="item-view-description-item">
            <img src={sizesIcon} alt="Various Sizes" className="item-view-description-icon" />
            <div className="item-view-description-text">
              <h3>Various Sizes</h3>
              <p>This product is available in a range of sizes to cater to different needs and preferences. Whether you need a small size for a compact space or a larger option for more extensive coverage, we have you covered.</p>
              <p>Key Features:</p>
              <ul>
                <li>Options available in multiple sizes to fit your needs.</li>
                <li>Size guide included to help you choose the perfect fit.</li>
                <li>Versatile sizing for various applications and uses.</li>
              </ul>
            </div>
          </div>
        </div>
        <p><strong>Usage Instructions:</strong> Use as directed for optimal performance. Ensure to keep the product clean and dry. For best results, follow the recommended care instructions provided with the product.</p>
        <p><strong>Customer Reviews:</strong> "Great product! My pet loves it." - Jane Doe</p>
        <p>"Excellent quality and fast shipping." - John Smith</p>
        <p><strong>FAQs:</strong></p>
        <p><strong>Q:</strong> Is this item washable?</p>
        <p><strong>A:</strong> Yes, it is machine washable. Please follow the care instructions provided for best results.</p>
        <p><strong>Q:</strong> What materials is this item made of?</p>
        <p><strong>A:</strong> It is made from high-quality, eco-friendly materials that are safe for your pet and the environment.</p>
      </section>

      {/* Show Cart if visible */}
      {showCart && (
        <Cart 
          items={cartItems} 
          onClose={handleCloseCart} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemoveItem={handleRemoveItem} 
        />
      )}

      <Footer />
    </div>
  );
};

export default ItemViewPage;
