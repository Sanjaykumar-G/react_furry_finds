import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ItemViewPage.css'; // Import the updated CSS
import { Header, Footer } from '../Homepage';
import Cart from '../cart/Cart'; // Import Cart component

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

  // Ensure the selected price is valid
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
            {/* Example thumbnails, adjust paths and alt text as needed */}
            <div className="item-view-thumbnail">
              <img src={item.image} alt="Thumbnail 1" />
            </div>
            <div className="item-view-thumbnail">
              <img src={item.image} alt="Thumbnail 2" />
            </div>
            {/* Add more thumbnails as needed */}
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
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="item-view-size-select"
            >
              <option value="2kg">2 kg</option>
              <option value="5kg">5 kg</option>
              <option value="10kg">10 kg</option>
              <option value="20kg">20 kg</option>
            </select>
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
          <button className="item-view-add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
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
          <ul>
            <li>
              <img src="path/to/icon1.png" alt="Feature 1" />
              <span>High-quality materials</span>
            </li>
            <li>
              <img src="path/to/icon2.png" alt="Feature 2" />
              <span>Durable and long-lasting</span>
            </li>
            <li>
              <img src="path/to/icon3.png" alt="Feature 3" />
              <span>Available in various sizes</span>
            </li>
          </ul>
          <p><strong>Usage Instructions:</strong> Use as directed. Ensure to keep the item clean and dry for optimal performance.</p>
          <p><strong>Customer Reviews:</strong> "Great product! My pet loves it." - Jane Doe</p>
          <p>"Excellent quality and fast shipping." - John Smith</p>
          <p><strong>FAQs:</strong></p>
          <p><strong>Q:</strong> Is this item washable?</p>
          <p><strong>A:</strong> Yes, it is machine washable. Please follow the care instructions.</p>
        </div>
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
