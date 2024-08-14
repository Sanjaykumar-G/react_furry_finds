import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import CSS for cart
import closeIcon from '../../assets/close-icon.svg'; // Import close icon
import dustbinIcon from '../../assets/dustbin-icon.svg'; // Import dustbin icon

const Cart = ({ items, onClose, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  const totalAmount = items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  const totalMRP = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const pointsEarned = Math.floor(totalAmount); // Assuming points are earned equal to the amount spent

  const handleCheckout = () => {
    navigate('/checkout', { state: { items } });
  };

  return (
    <div className="unique-cart-overlay">
      <div className="unique-cart-container">
        <button className="unique-cart-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="unique-cart-close-icon" />
        </button>
        <div className="unique-cart-header">
          <h2 className="unique-cart-title">Shopping Cart</h2>
          <p className="unique-cart-shipping-info">Congratulations, you have free prepaid shipping!</p>
        </div>
        <ul className="unique-cart-items-list">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="unique-cart-item">
                <img src={item.image} alt={item.name} className="unique-cart-item-image" />
                <div className="unique-cart-item-details">
                  <h3 className="unique-cart-item-name">{item.name}</h3>
                  <p className="unique-cart-item-quantity">
                    Quantity: 
                    <button 
                      className="unique-cart-quantity-button" 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    {item.quantity}
                    <button 
                      className="unique-cart-quantity-button" 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </p>
                  <p className="unique-cart-item-price">Price: ₹{item.discountPrice.toFixed(2)}</p>
                  <p className="unique-cart-item-original-price">MRP: ₹{item.price.toFixed(2)}</p>
                  <button className="unique-cart-remove-button" onClick={() => onRemoveItem(item.id)}>
                    <img src={dustbinIcon} alt="Remove" className="unique-cart-remove-icon" />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="unique-cart-empty-message">Your cart is empty.</p>
          )}
        </ul>
        <div className="unique-cart-summary">
          <h3>Price Details</h3>
          <p className="unique-cart-summary-item">MRP (Incl Taxes): ₹{totalMRP.toFixed(2)}</p>
          <p className="unique-cart-summary-item">YOU SAVE: ₹{(totalMRP - totalAmount).toFixed(2)}</p>
          <p className="unique-cart-summary-item">You Pay: ₹{totalAmount.toFixed(2)}</p>
          <p className="unique-cart-summary-item">Petsy Member? You will earn {pointsEarned} Petsy Points on this purchase</p>
        </div>
        <div className="unique-cart-checkout">
          <button className="unique-cart-checkout-button" onClick={handleCheckout}>
            Checkout ₹{totalAmount.toFixed(2)}
          </button>
          <p className="unique-cart-checkout-info">Shipping and Petsy Points redemption will be calculated on checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
