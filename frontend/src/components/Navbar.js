import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          E-Commerce
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/products" className="nav-link">Products</Link></li>
          
          {user ? (
            <>
              <li><Link to="/cart" className="nav-link">Cart</Link></li>
              <li><Link to="/orders" className="nav-link">Orders</Link></li>
              <li>
                <span className="nav-link">Hello, {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;