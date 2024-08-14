import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.css'; // Import CSS for checkout
import { Header,Footer } from '../Homepage';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import creditCardIcon from '../../assets/credit.png';
import upiIcon from '../../assets/upi.png';
import googlePayIcon from '../../assets/gpay.png';
import phonepeIcon from '../../assets/phonepe.png';
import paypalIcon from '../../assets/paypal.png';
import bankTransferIcon from '../../assets/bank.png';
import hdfcIcon from '../../assets/hdfc.png';
import canaraIcon from '../../assets/canara.png';
import iciciIcon from '../../assets/icici.png';
import cashOnDeliveryIcon from '../../assets/cash.png';


// Component to handle map events and marker updates
const LocationSelector = ({ onLocationChange, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationChange(e.latlng);
    },
  });

  return (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const { items } = location.state || {};

  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [mapLocation, setMapLocation] = useState([37.7749, -122.4194]); // Default to San Francisco
  const [mapAddress, setMapAddress] = useState('');
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [selectedUPIOption, setSelectedUPIOption] = useState('');
  const [selectedBankOption, setSelectedBankOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if (mapLocation) {
      fetchAddress(mapLocation);
    }
  }, [mapLocation]);

  const fetchAddress = async ([lat, lng]) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      setMapAddress(data.display_name || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setMapAddress('Error fetching address');
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === 'credit-card') {
      setShowCreditCardForm(!showCreditCardForm); // Toggle credit card form visibility
    } else {
      setShowCreditCardForm(false);
    }
  };

  const handleUPIOptionChange = (e) => {
    setSelectedUPIOption(e.target.value);
  };

  const handleBankOptionChange = (e) => {
    setSelectedBankOption(e.target.value);
  };

  const handleLocationChange = (latlng) => {
    setMapLocation([latlng.lat, latlng.lng]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Order placed successfully!');
  };

  if (!items) {
    return <div>No items in cart</div>;
  }

  const subtotal = items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  const shippingCost = 50; // Example shipping cost
  const gst = (subtotal + shippingCost) * 0.18; // Example GST (18%)
  const totalAmount = subtotal + shippingCost + gst;

  return (
    <div className="checkout-page">
      <Header />
      <h1>Checkout</h1>
      <br/>
      <br/>
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-address">
              <h2>Shipping Address</h2>
              <div className="checkout-address-details">
                <input
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Full Name"
                  className="checkout-address-detail-input"
                  required
                />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Phone Number"
                  className="checkout-address-detail-input"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="checkout-address-detail-input"
                  required
                />
                <textarea
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter your shipping address"
                  className="checkout-address-input"
                  required
                />
              </div>
            </div>

            <div className="checkout-map">
              <h2>Select Location on Map</h2>
              <MapContainer center={mapLocation} zoom={12} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationSelector onLocationChange={handleLocationChange} initialPosition={mapLocation} />
              </MapContainer>
              <div className="selected-location">
                <p>Selected Location:</p>
                <p>Latitude: {mapLocation[0].toFixed(6)}</p>
                <p>Longitude: {mapLocation[1].toFixed(6)}</p>
                <p>Address: {mapAddress}</p>
              </div>
            </div>

            <div className="checkout-payment">
              <h2>Payment Method</h2>
              <div className="checkout-payment-options">
                <button
  type="button"
  className={`payment-button ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
  onClick={() => handlePaymentMethodChange('credit-card')}
>
  <img src={creditCardIcon} alt="Credit Card" className="payment-icon" />
  Credit Card
</button>

{paymentMethod === 'credit-card' && (
  <div className={`credit-card-form ${showCreditCardForm ? 'show' : ''}`}>
    <h3>Enter Credit Card Details</h3>
    <input
      type="text"
      value={cardNumber}
      onChange={handleCardNumberChange}
      placeholder="Card Number"
      className="credit-card-input"
      required
    />
    <input
      type="text"
      value={expiryDate}
      onChange={handleExpiryDateChange}
      placeholder="Expiry Date (MM/YY)"
      className="credit-card-input"
      required
    />
    <input
      type="text"
      value={cvv}
      onChange={handleCvvChange}
      placeholder="CVV"
      className="credit-card-input"
      required
    />
  </div>
)}

<button
  type="button"
  className={`payment-button ${paymentMethod === 'upi' ? 'selected' : ''}`}
  onClick={() => handlePaymentMethodChange('upi')}
>
  <img src={upiIcon} alt="UPI" className="payment-icon" />
  UPI
</button>

{paymentMethod === 'upi' && (
  <div className={`upi-options ${selectedUPIOption ? 'show' : ''}`}>
    <label>
      <input
        type="radio"
        name="upi-option"
        value="google-pay"
        checked={selectedUPIOption === 'google-pay'}
        onChange={handleUPIOptionChange}
      />
      <img src={googlePayIcon} alt="Google Pay" className="payment-icon" />
      Google Pay
    </label>
    <label>
      <input
        type="radio"
        name="upi-option"
        value="phonepe"
        checked={selectedUPIOption === 'phonepe'}
        onChange={handleUPIOptionChange}
      />
      <img src={phonepeIcon} alt="PhonePe" className="payment-icon" />
      PhonePe
    </label>
    <label>
      <input
        type="radio"
        name="upi-option"
        value="paypal"
        checked={selectedUPIOption === 'paypal'}
        onChange={handleUPIOptionChange}
      />
      <img src={paypalIcon} alt="PayPal" className="payment-icon" />
      PayPal
    </label>
  </div>
)}

<button
  type="button"
  className={`payment-button ${paymentMethod === 'bank-transfer' ? 'selected' : ''}`}
  onClick={() => handlePaymentMethodChange('bank-transfer')}
>
  <img src={bankTransferIcon} alt="Bank Transfer" className="payment-icon" />
  Bank Transfer
</button>

{paymentMethod === 'bank-transfer' && (
  <div className={`bank-options ${selectedBankOption ? 'show' : ''}`}>
    <label>
      <input
        type="radio"
        name="bank-option"
        value="hdfc"
        checked={selectedBankOption === 'hdfc'}
        onChange={handleBankOptionChange}
      />
      <img src={hdfcIcon} alt="HDFC" className="payment-icon" />
      HDFC
    </label>
    <label>
      <input
        type="radio"
        name="bank-option"
        value="canara"
        checked={selectedBankOption === 'canara'}
        onChange={handleBankOptionChange}
      />
      <img src={canaraIcon} alt="Canara Bank" className="payment-icon" />
      Canara Bank
    </label>
    <label>
      <input
        type="radio"
        name="bank-option"
        value="icici"
        checked={selectedBankOption === 'icici'}
        onChange={handleBankOptionChange}
      />
      <img src={iciciIcon} alt="ICICI" className="payment-icon" />
      ICICI
    </label>
  </div>
)}

<button
  type="button"
  className={`payment-button ${paymentMethod === 'cash-on-delivery' ? 'selected' : ''}`}
  onClick={() => handlePaymentMethodChange('cash-on-delivery')}
>
  <img src={cashOnDeliveryIcon} alt="Cash on Delivery" className="payment-icon" />
  Cash on Delivery
</button>
              </div>
            </div>

            <div className="checkout-submit">
              <button
                type="submit"
                className="button-49"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="checkout-details">
          <div className="checkout-items">
            <h2>Order Summary</h2>
            <ul className="checkout-items-list">
              {items.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                    <p className="checkout-item-price">Price: ₹{item.discountPrice.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="checkout-cost-details">
            <h2>Cost Details</h2>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Shipping: ₹{shippingCost.toFixed(2)}</p>
            <p>GST (18%): ₹{gst.toFixed(2)}</p>
            <p className="checkout-total">Total: ₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CheckoutPage;
