// AdminNavbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="nav-header">
        Admin Panel
      </div>
      <ul>
        <li>
          <Link to="/user">Users</Link>
        </li>
        <li>
          <Link to="/admin/products">Product Details</Link>
        </li>
        <li>
          <Link to="/admin/orders">Order Details</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
