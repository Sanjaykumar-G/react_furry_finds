import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faMapMarkerAlt, faSearch, faPaw, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Add this import
import dogImage from '../assets/dog.jpg';
import catImage from '../assets/cat.jpg';
import birdImage from '../assets/bird.jpg'; // Replace with actual path
import hamsterImage from '../assets/hamster.jpg'; // Replace with actual path
 // Ensure this path is correct
import '../Homepage.css';
import '../dog.css';
import { Link } from 'react-router-dom';
import videoSrc from '../assets/homedog.mp4';// Adjust the path based on your directory structure
import Cart from '../components/cart/Cart';


import adoptionImage from '../assets/adoption.jpg';
import foodsImage from '../assets/foods.jpg';
import accessoriesImage from '../assets/accessories.jpg';
import doctorImage from '../assets/doctor.jpg';
import sellingImage from '../assets/selling.jpg';
import trainingImage from '../assets/training.jpg';
import { useNavigate } from 'react-router-dom';




// Header Component
export const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Your Location');
  const [showMap, setShowMap] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const locations = ['Location 1', 'Location 2', 'Location 3']; // Example locations

  const handleCategoriesClick = () => setShowCategories(!showCategories);
  const handleCurrentLocationClick = () => console.log('Current Location Clicked');
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
  };
  const handleMapClose = () => setShowMap(false);
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate('/cart');
  };

  

  return (
    <header className="header">
      <div className="header-content">
        <div className="dog-animation">
          <div className="main">
            <div className="dog">
              <div className="dog__paws">
                <div className="dog__bl-leg leg">
                  <div className="dog__bl-paw paw"></div>
                  <div className="dog__bl-top top"></div>
                </div>
                <div className="dog__fl-leg leg">
                  <div className="dog__fl-paw paw"></div>
                  <div className="dog__fl-top top"></div>
                </div>
                <div className="dog__fr-leg leg">
                  <div className="dog__fr-paw paw"></div>
                  <div className="dog__fr-top top"></div>
                </div>
              </div>
              <div className="dog__body">
                <div className="dog__tail"></div>
              </div>
              <div className="dog__head">
                <div className="dog__snout">
                  <div className="dog__nose"></div>
                  <div className="dog__eyes">
                    <div className="dog__eye-l"></div>
                    <div className="dog__eye-r"></div>
                  </div>
                </div>
                <div className="dog__head-c">
                  <div className="dog__ear-l"></div>
                  <div className="dog__ear-r"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1>Furry Finds</h1>
        <div className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} /> Contact
              </Link>
            </li>
            <li className="dropdown">
              <button className="dropbtn" onClick={handleCategoriesClick}>
                <FontAwesomeIcon icon={faPaw} /> Pet Categories
              </button>
              {showCategories && (
                <div className="dropdown-content">
                  <a href="#">Dogs</a>
                  <a href="#">Cats</a>
                  <a href="#">Birds</a>
                  <a href="#">Rabbits</a>
                </div>
              )}
            </li>
            <li className="location-dropdown">
              <button className="location-btn" onClick={() => setShowCurrentLocation(!showCurrentLocation)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
              </button>
              <div className="location-content" style={{ display: showCurrentLocation ? 'block' : 'none' }}>
                <button className="location-btn" onClick={handleCurrentLocationClick}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Current Location
                </button>
                {locations.map((loc, index) => (
                  <a href="#" key={index} onClick={() => setLocation(loc)}>
                    {loc}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search for pets..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <br />
          <br />
          <div className="cart-container">
      <FontAwesomeIcon 
        icon={faShoppingCart} 
        className="cart-icon" 
        onClick={handleCartClick} 
      />
    </div>
        </div>
        <div className="profile-dropdown">
          <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          {showDropdown && (
            <div className="profile-dropdown-content">
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/profile">Profile</Link>
            </div>
          )}
        </div>
      </div>
      {showMap && (
        <div className="map-modal">
          <button className="map-close-btn" onClick={handleMapClose}>Close</button>
          <div className="map-container">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=YOUR_GOOGLE_MAPS_API_KEY`}
              allowFullScreen
              title="Map"
            ></iframe>
          </div>
        </div>
      )}
    </header>
  );
};





// Hero Section Component

const HeroSection = () => (
  <section className="hero-section">
    <h2>Welcome to Furry Finds</h2>
    <p>Your one-stop destination to find the perfect pet for you and your family.</p>
  </section>
);

const VideoSection = () => (
  <section className="video-section">
    <video autoPlay muted loop>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
);

// Categories Component

const categories = [
  { name: 'Dog', image: dogImage, link: '/dog' },
  { name: 'Cat', image: require('../assets/cat.jpg'), link: '/cat' },
  { name: 'Bird', image: require('../assets/bird.jpg'), link: '/bird' },
  { name: 'Hamster', image: require('../assets/hamster.jpg'), link: '/hamster' },
];

const Categories = () => {
  return (
    <div className="categories-container">
      <h2 className="categories-title">Find Your Pet</h2>
      <div className="categories-box-container"> {/* Updated class name */}
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-box">
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </Link>
        ))}
        <div className="browse-arrow">&rarr;</div>
      </div>
    </div>
  );
};


// Featured Pets Component
const sections = [
  // { name: 'Adoption', image: adoptionImage },
  { name: 'Foods', image: foodsImage, link: '/food' },
  { name: 'Pet Accessories', image: accessoriesImage, link: '/toys' },
  // { name: 'Nearby Veterinary Doctor', image: doctorImage },
  // { name: 'Selling Option', image: sellingImage },
  // { name: 'Training', image: trainingImage }, // New option
];

const FeaturedPets = () => {
  return (
    <section className="featured-pets">
      <h2 className="featured-title">Explore</h2>
      <div className="featured-container">
        {sections.map((section, index) => (
          <Link key={index} to={section.link} className="featured-box">
            <img src={section.image} alt={section.name} className="featured-image" />
            <div className="featured-name">{section.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};



// About Us Component
const AboutUs = () => (
  <section className="about-us">
    <h2>About Us</h2>
    <p>
      Welcome to Furry Finds, your one-stop destination to find the perfect pet for you and your family. 
      We are dedicated to helping animals find loving homes and ensuring that pet owners have a smooth 
      and enjoyable experience. Our team is passionate about animal welfare and committed to making a 
      positive impact in the community.
    We provide detailed information about various pet breeds, including dogs, 
      cats, birds, rabbits, and more. Whether you are looking for a playful puppy or a calm kitten, 
      we have all the information you need to make the best choice.
    Discover a wide range of high-quality pet food to keep your furry friend healthy 
      and happy. We offer recommendations for different dietary needs and preferences.
   Dress your pets in style with our selection of pet clothing and accessories. 
      From cozy sweaters to cute costumes, we have everything to make your pet look fabulous.
     Find the best veterinary services in your area. We provide a 
      list of trusted veterinary doctors and clinics to ensure your pet receives the best care possible.
    Explore additional resources and services, including pet grooming, training tips, 
      and adoption events. We are here to support you and your pet every step of the way.
    </p>

    <div className="box-container">
    <div className="box mission-box">
      <h3>Mission</h3>
      <p>
        Our mission is to create a world where every pet finds a loving home and every pet owner has the 
        support they need to provide the best care for their furry companions. We aim to promote animal 
        welfare through education, advocacy, and community engagement.
      </p>
    </div>
    <div className="box goals-box">
      <h3>Goals</h3>
      <ul>
        <li>To educate the public about responsible pet ownership.</li>
        <li>To partner with local shelters and rescue organizations to increase pet adoptions.</li>
        <li>To provide resources and support for pet owners, including veterinary care and pet supplies.</li>
        <li>To advocate for animal welfare legislation and policies.</li>
      </ul>
    </div>
    <div className="box theme-box">
      <h3>Approach</h3>
      <p>
        At Furry Finds, our approach is holistic and community-focused. We believe that every pet deserves 
        a chance at a happy life and that every pet owner should have access to the best resources and 
        support. Our platform is designed to be a comprehensive resource for pet adoption, care, and 
        community engagement.
      </p>
    </div>
  </div>
  </section>
);



// Footer Component
export const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-info">
        <h3>Contact Us</h3>
        <p>Email: info@furryfinds.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Pet Street, Pet City, PC 12345</p>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Furry Finds. All rights reserved.</p>
    </div>
  </footer>
);

// Main Homepage Component
const Homepage = () => (
  <div className="app">
    <Header />
    <VideoSection />
    <HeroSection />
    <Categories />
    <FeaturedPets />
    <AboutUs />
    <Footer />
  </div>
);

export default Homepage;
