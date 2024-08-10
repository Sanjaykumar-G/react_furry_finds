import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import dogImage from '../../assets/dogfood.jpg.jpeg'; // Import images
import catImage from '../../assets/cat.jpg'; // Import images
import SlideImage1 from '../../assets/slide1.jpg';
import SlideImage2 from '../../assets/slide2.jpg';
import SlideImage3 from '../../assets/slide3.jpg';
import SlideImage4 from '../../assets/slide4.jpg';
import DiscountCarousel from '../DiscountCarousel';
import { Header, Footer } from '../Homepage';
import Cart from '../cart/Cart'; // Import Cart component

import './PetFoodsListPage.css'; // Import CSS

const PetFoodsListPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [petFoods, setPetFoods] = useState([
    { id: 1, name: 'Premium Dog Food', price: 50, discountPrice: 40, rating: 4.5, brand: 'Brand A', petType: 'dog', image: dogImage },
    { id: 2, name: 'Premium Dog Food', price: 50, discountPrice: 40, rating: 4.5, brand: 'Brand A', petType: 'dog', image: dogImage },
    { id: 3, name: 'Premium Dog Food', price: 50, discountPrice: 40, rating: 4.5, brand: 'Brand A', petType: 'dog', image: dogImage },
    { id: 4, name: 'Premium Dog Food', price: 50, discountPrice: 40, rating: 4.5, brand: 'Brand A', petType: 'dog', image: dogImage },
    { id: 5, name: 'Premium Dog Food', price: 50, discountPrice: 40, rating: 4.5, brand: 'Brand A', petType: 'dog', image: dogImage },
    { id: 6, name: 'Catnip Treats', price: 20, discountPrice: 15, rating: 4.0, brand: 'Brand B', petType: 'cat', image: catImage },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleBrandFilterChange = (e) => {
    setBrandFilter(e.target.value);
  };

  const handlePetTypeFilterChange = (e) => {
    setPetTypeFilter(e.target.value);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setShowCart(true); // Show the cart when an item is added
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

  const filteredPetFoods = petFoods.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'under-25' && item.price < 25) ||
      (priceFilter === '25-50' && item.price >= 25 && item.price <= 50) ||
      (priceFilter === 'above-50' && item.price > 50);
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === '4-and-up' && item.rating >= 4) ||
      (ratingFilter === '3-and-up' && item.rating >= 3);
    const matchesBrand = brandFilter === 'all' || item.brand === brandFilter;
    const matchesPetType = petTypeFilter === 'all' || item.petType === petTypeFilter;

    return matchesName && matchesPrice && matchesRating && matchesBrand && matchesPetType;
  });

  // Carousel images for discount offers
  const discountImages = [
    { src: SlideImage1, alt: 'Dog Discount' },
    { src: SlideImage2, alt: 'Dog Discount' },
    { src: SlideImage3, alt: 'Dog Discount' },
    { src: SlideImage4, alt: 'Dog Discount' },
    // Add more discount images as needed
  ];

  return (
    <div className="pet-foods-list-page">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <header className="pet-foods-page-header">
        <nav className="pet-foods-page-navigation">
          <a href="#" className="pet-foods-nav-link">Home</a> / <a href="#" className="pet-foods-nav-link">All Products</a>
        </nav>
      </header>
      <h1 className="pet-foods-page-title">Pet Foods</h1>

      {/* Discount Carousel Section */}
      <section className="pet-foods-discount-carousel-section">
        <h2 className="pet-foods-section-title">Exclusive Discounts</h2>
        <DiscountCarousel images={discountImages} className="pet-foods-discount-carousel" />
      </section>

      {/* Filter Section */}
      <section className="pet-foods-filter-section">
        <div className="pet-foods-search-filter">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="pet-foods-search-input"
          />
        </div>
        <div className="pet-foods-filter-options">
          <div className="pet-foods-filter-group pet-foods-price-filter-group">
            <label htmlFor="price-filter" className="pet-foods-filter-label">Price Range:</label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={handlePriceFilterChange}
              className="pet-foods-filter-select pet-foods-price-filter-select"
            >
              <option value="all">All</option>
              <option value="under-25">Under $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="above-50">Above $50</option>
            </select>
          </div>
          <div className="pet-foods-filter-group pet-foods-rating-filter-group">
            <label htmlFor="rating-filter" className="pet-foods-filter-label">Rating:</label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={handleRatingFilterChange}
              className="pet-foods-filter-select pet-foods-rating-filter-select"
            >
              <option value="all">All</option>
              <option value="4-and-up">4 and up</option>
              <option value="3-and-up">3 and up</option>
            </select>
          </div>
          <div className="pet-foods-filter-group pet-foods-brand-filter-group">
            <label htmlFor="brand-filter" className="pet-foods-filter-label">Brand:</label>
            <select
              id="brand-filter"
              value={brandFilter}
              onChange={handleBrandFilterChange}
              className="pet-foods-filter-select pet-foods-brand-filter-select"
            >
              <option value="all">All</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              {/* Add more brands as needed */}
            </select>
          </div>
          <div className="pet-foods-filter-group pet-foods-pet-type-filter-group">
            <label htmlFor="pet-type-filter" className="pet-foods-filter-label">Pet Type:</label>
            <select
              id="pet-type-filter"
              value={petTypeFilter}
              onChange={handlePetTypeFilterChange}
              className="pet-foods-filter-select pet-foods-pet-type-filter-select"
            >
              <option value="all">All</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              {/* Add more pet types as needed */}
            </select>
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section className="pet-foods-product-list">
        {filteredPetFoods.map((item) => (
          <div key={item.id} className="pet-foods-product-card">
            <img src={item.image} alt={item.name} className="pet-foods-product-image" />
            <div className="pet-foods-product-details">
              <h2 className="pet-foods-product-name">{item.name}</h2>
              <p className="pet-foods-product-price">
                <span className="pet-foods-product-discount-price">${item.discountPrice.toFixed(2)}</span>
                <span className="pet-foods-product-original-price">${item.price.toFixed(2)}</span>
              </p>
              <div className="pet-foods-product-rating">
                {'★'.repeat(Math.floor(item.rating))}
                {'☆'.repeat(5 - Math.floor(item.rating))}
              </div>
              <div className="pet-foods-product-buttons">
                <button 
                  className="pet-foods-add-to-cart-button" 
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <button 
                  className="pet-foods-view-button" 
                  onClick={() => navigate(`/item/${item.id}`, { state: { item } })}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default PetFoodsListPage;
