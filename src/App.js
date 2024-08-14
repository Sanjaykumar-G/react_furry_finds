import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/cart/CartContext'; // Import CartProvider
import CheckoutPage from './components/checkout/CheckoutPage';

import Homepage from './components/Homepage'; 
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm'; 
import Contact from './components/Contact'; 
import DogProductListPage from './components/dogpage/DogProductListPage';
import CatProductListPage from './components/catpage/CatProductListPage';
import PetFoodsListPage from './components/foodpage/PetFoodsListPage';
import ItemViewPage from './components/fooditem/ItemViewPage';
import DogDetailViewPage from './components/dogpage/DogDetailViewPage';
import PetToysListPage from './components/toypage/PetToysListPage';
import AdminNavbar from './components/admin/AdminNavbar';
import UserListPage from './components/admin/UserListPage';
import CatDetailViewPage from './components/catpage/CatDetailViewPage';
// import Loading from './components/Loading';

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
          <Route path="/toys" element={<PetToysListPage />} />
          <Route path="/item/:id" element={<ItemViewPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/load" element={<Loading />} /> */}
          {/* <Route path="/dog/:id" element={<ItemViewPage />} /> */}
          <Route path="/product/:id" element={<DogDetailViewPage />} />
          <Route path="/product2/:id" element={<CatDetailViewPage/>} />
          <Route path='/admin' element={<AdminNavbar/>}/>
          <Route path='/user' element={<UserListPage/>}/>
          

        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
