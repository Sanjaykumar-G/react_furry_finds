import React, { useEffect } from 'react';
import Filters from './Filters';
import ProductList from './ProductList';
import '../../ProductListPage.css';
import { Header, Footer } from '../Homepage';

const ProductListPage = () => {
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (event) => {
      if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelector('header nav').addEventListener('click', handleSmoothScroll);

    // Cleanup event listener on component unmount
    return () => {
      document.querySelector('header nav').removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div className="container">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <header>
        <nav>
          <a href="#">Home</a> / <a href="#">All Products</a>
        </nav>
      </header>
      <main>
        <Filters />
        <ProductList />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductListPage;
