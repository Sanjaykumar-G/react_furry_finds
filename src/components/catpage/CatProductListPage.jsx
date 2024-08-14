// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../ProductListPage.css'; // Adjust the path as needed
import dogImage from '../../assets/dog.jpg'; // Adjust the path as needed
import catImage1 from '../../assets/cat.jpg'; // Adjust the path as needed
import catImage2 from '../../assets/cat2.jpg'; // Adjust the path as needed
import catImage3 from '../../assets/cat3.jpg'; // Adjust the path as needed
import catImage4 from '../../assets/cat4.jpg'; // Adjust the path as needed
import catImage5 from '../../assets/cat5.jpg'; // Adjust the path as needed
import catImage6 from '../../assets/cat6.jpg'; // Adjust the path as needed
import catImage7 from '../../assets/cat7.jpg'; // Adjust the path as needed
import catImage8 from '../../assets/cat8.jpg'; // Adjust the path as needed
import catImage9 from '../../assets/cat9.jpg'; // Adjust the path as needed
import { Header, Footer } from '../Homepage';

// Combined Filters Component
const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1000);
    setMinValue(value);
    setPriceRange([value, maxValue]);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1000);
    setMaxValue(value);
    setPriceRange([minValue, value]);
  };

  return (
    <aside className="filters">
      <h2>Filters</h2>
      <div className="filter-price">
        <h3>Price</h3>
        <div className="price-slider">
          <div className="slider">
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={minValue}
              onChange={handleMinChange}
              className="range-min"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={maxValue}
              onChange={handleMaxChange}
              className="range-max"
            />
            <div
              className="progress"
              style={{
                left: `${((minValue - 0) / (1000000 - 0)) * 100}%`,
                right: `${100 - ((maxValue - 0) / (1000000 - 0)) * 100}%`
              }}
            ></div>
          </div>
          <div className="price-labels">
            <span>₹{minValue}</span> - <span>₹{maxValue}</span>
          </div>
        </div>
      </div>
      <div className="filter-category">
        <h3>Categories</h3>
        <ul>
          <li><input type="checkbox" /> Labrador (2821)</li>
          <li><input type="checkbox" /> German Shepherd (1921)</li>
          <li><input type="checkbox" /> Bulldog (1420)</li>
          <li><input type="checkbox" /> Beagle (1020)</li>
          <li><input type="checkbox" /> Poodle (897)</li>
          <li><input type="checkbox" /> Rottweiler (650)</li>
          <li><input type="checkbox" /> Dachshund (410)</li>
          <li><input type="checkbox" /> Boxer (320)</li>
          <li><input type="checkbox" /> Shih Tzu (210)</li>
        </ul>
      </div>
      <div className="filter-brand">
        <h3>Brand</h3>
        <ul>
          <li><input type="checkbox" /> Anouk (8921)</li>
          <li><input type="checkbox" /> Sangria (9071)</li>
          <li><input type="checkbox" /> W (1599)</li>
          <li><input type="checkbox" /> Biba (1440)</li>
          <li><input type="checkbox" /> West (2345)</li>
          <li><input type="checkbox" /> Aries (23443)</li>
          <li><input type="checkbox" /> Kushal (23421)</li>
          <li><input type="checkbox" /> Lorem (5674)</li>
          <li><input type="checkbox" /> Ipsum (9087)</li>
        </ul>
      </div>
    </aside>
  );
};

// Combined ProductCard Component
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found</div>;
  }

  const { id, catName, price, description, imageUrl } = product;

  const handleDetailsClick = () => {
    navigate(`/product2/${id}`);
  };

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-card-front">
          <img src={imageUrl || dogImage} alt={catName} />
          <h3>{catName}</h3>
          <p className="price">₹{price}</p>
        </div>
        <div className="product-card-back">
          <p>{description}</p>
          <div className="details">
            <button className="details-btn" onClick={handleDetailsClick}>Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Combined ProductList Component
const initialProducts = [
  { id: 1, catName: 'Whiskers', price: 990, description: 'A very friendly and playful cat.', imageUrl: catImage1 },
  { id: 2, catName: 'Mittens', price: 860, description: 'A cool and calm cat.', imageUrl: catImage2 },
  { id: 3, catName: 'Shadow', price: 1120, description: 'An amazing cat with great skills.', imageUrl: catImage3 },
  { id: 4, catName: 'Simba', price: 1300, description: 'A friendly and loyal cat.', imageUrl: catImage4 },
  { id: 5, catName: 'Bella', price: 950, description: 'A cute and cheerful cat.', imageUrl: catImage5 },
  { id: 6, catName: 'Max', price: 1250, description: 'A strong and protective cat.', imageUrl: catImage6 },
  { id: 7, catName: 'Lucy', price: 870, description: 'A small and lively cat.', imageUrl: catImage7 },
  { id: 8, catName: 'Rocky', price: 1100, description: 'A brave and energetic cat.', imageUrl: catImage8 },
  { id: 9, catName: 'Daisy', price: 890, description: 'A small and affectionate cat.', imageUrl: catImage9 }
];



const ProductPage = () => {
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === parseInt(id));
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  }, [id, products]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    
    const sortedProducts = [...products].sort((a, b) => {
      switch (value) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.catName.localeCompare(b.catName);
        case 'name-desc':
          return b.catName.localeCompare(a.catName);
        default:
          return 0;
      }
    });
    
    setProducts(sortedProducts);
  };

  return (
    <div className='high'>
      <Header />
      <br /><br /><br /><br /><br />
      <div className="container">
        <header>
          <nav>
            <a href="#">Home</a> / <a href="#">All Products</a>
          </nav>
        </header>
        <main>
          {selectedProduct ? (
            <div className="dog-details">
              <h1>{selectedProduct.CatName}</h1>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.CatName} className="dog-image" />
              <div className="dog-info">
                <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <button onClick={() => navigate('/')}>Back to List</button>
              </div>
            </div>
          ) : (
            <>
              <Filters />
              <section className="product-list">
                <h2>All Products</h2>
                <div className="sort-by">
                  <select value={sortOption} onChange={handleSortChange}>
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                    <option value="name-asc">Sort by: Name (A to Z)</option>
                    <option value="name-desc">Sort by: Name (Z to A)</option>
                  </select>
                </div>
                <div className="products">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductPage;
