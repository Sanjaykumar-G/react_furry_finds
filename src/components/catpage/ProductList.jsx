import React, { useState } from 'react';
import ProductCard from './ProductCard';
import dogImage from '../../assets/cat.jpg'; // Adjust the number of `../` based on the folder structure

const initialProducts = [
  { id: 1, dogName: 'Awesome Dog 1', price: 990, description: 'A very friendly and playful dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 2, dogName: 'Cool Dog 2', price: 860, description: 'A cool and calm dog.', imageUrl: dogImage },
  { id: 3, dogName: 'Amazing Dog 3', price: 1120, description: 'An amazing dog with great skills.', imageUrl: dogImage }
];

const ProductList = () => {
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState(initialProducts);

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
  );
};

export default ProductList;
