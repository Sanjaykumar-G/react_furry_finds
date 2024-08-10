import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/cart/CartContext'; // Import CartProvider

import Homepage from './components/Homepage'; 
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm'; 
import Contact from './components/Contact'; 
import DogProductListPage from './components/dogpage/DogProductListPage';
import CatProductListPage from './components/catpage/CatProductListPage';
import PetFoodsListPage from './components/foodpage/PetFoodsListPage';
import ItemViewPage from './components/fooditem/ItemViewPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Homepage />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/dog" element={<DogProductListPage />} />
          <Route path="/cat" element={<CatProductListPage />} />
          <Route path="/food" element={<PetFoodsListPage />} />
          <Route path="/item/:id" element={<ItemViewPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
