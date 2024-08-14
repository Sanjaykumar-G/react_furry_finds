// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../ProductListPage.css'; // Adjust the path as needed
import dogImage from '../../assets/dog.jpg'; // Adjust the path as needed
import dogImage22 from '../../assets/dog2.jpg'; // Adjust the path as needed
import dogImage33 from '../../assets/dog3.jpg'; // Adjust the path as needed
import dogImage44 from '../../assets/dog4.jpg'; // Adjust the path as needed
import dogImage55 from '../../assets/dog5.jpg'; // Adjust the path as needed
import dogImage66 from '../../assets/dog6.jpg'; // Adjust the path as needed
import dogImage77 from '../../assets/dog7.jpg'; // Adjust the path as needed
import dogImage88 from '../../assets/dog8.jpg'; // Adjust the path as needed
import dogImage99 from '../../assets/dog9.jpg'; // Adjust the path as needed
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

  const { id, dogName, price, description, imageUrl } = product;

  const handleDetailsClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-card-front">
          <img src={imageUrl || dogImage} alt={dogName} />
          <h3>{dogName}</h3>
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
  { id: 1, dogName: 'Alex', price: 990, description: 'A very friendly and playful dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool ', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage22 },
  { id: 3, dogName: 'de Dog', price: 1120, description: 'An amazing dog with great skills.', imageUrl: dogImage33 },
  { id: 4, dogName: 'Buddy', price: 1300, description: 'A friendly and loyal dog.', imageUrl: dogImage44 },
  { id: 5, dogName: 'Bella', price: 950, description: 'A cute and cheerful dog.', imageUrl: dogImage55 },
  { id: 6, dogName: 'Max', price: 1250, description: 'A strong and protective dog.', imageUrl: dogImage66 },
  { id: 7, dogName: 'Lucy', price: 870, description: 'A small and lively dog.', imageUrl: dogImage77 },
  { id: 8, dogName: 'Rocky', price: 1100, description: 'A brave and energetic dog.', imageUrl: dogImage88 },
  { id: 9, dogName: 'Daisy', price: 890, description: 'A small and affectionate dog.', imageUrl: dogImage99 }
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
          return a.dogName.localeCompare(b.dogName);
        case 'name-desc':
          return b.dogName.localeCompare(a.dogName);
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
              <h1>{selectedProduct.dogName}</h1>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.dogName} className="dog-image" />
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
