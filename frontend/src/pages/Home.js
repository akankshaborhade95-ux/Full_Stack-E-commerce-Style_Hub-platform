import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-gradient">StyleHub</span>
            </h1>
            <p className="hero-subtitle">
              Discover the latest trends in fashion, electronics, and lifestyle products. 
              Curated collections with exclusive deals just for you.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                🛍️ Shop Now
              </Link>
              <Link to="/products" className="btn btn-secondary">
                🔥 New Arrivals
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Premium Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-product product-1">
              <div className="product-icon">📱</div>
            </div>
            <div className="floating-product product-2">
              <div className="product-icon">👟</div>
            </div>
            <div className="floating-product product-3">
              <div className="product-icon">🎧</div>
            </div>
            <div className="floating-product product-4">
              <div className="product-icon">💻</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose StyleHub?</h2>
            <p className="section-subtitle">
              We're committed to providing you with the best shopping experience
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🚀</div>
              </div>
              <h3>Lightning Fast</h3>
              <p>Same-day delivery in metro areas. Get your orders delivered at lightning speed.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🛡️</div>
              </div>
              <h3>Secure Shopping</h3>
              <p>Bank-level security for all transactions. Your data is always protected.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⭐</div>
              </div>
              <h3>Premium Quality</h3>
              <p>Every product is quality-checked. We guarantee customer satisfaction.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💎</div>
              </div>
              <h3>Exclusive Deals</h3>
              <p>Special members-only discounts and early access to new collections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our carefully curated collections
            </p>
          </div>
          <div className="categories-grid">
            <Link to="/products?category=Electronics" className="category-card category-electronics">
              <div className="category-content">
                <div className="category-icon">📱</div>
                <h3>Electronics</h3>
                <p>Smartphones, Laptops & Gadgets</p>
                <span className="category-cta">Shop Now →</span>
              </div>
            </Link>
            
            <Link to="/products?category=Fashion" className="category-card category-fashion">
              <div className="category-content">
                <div className="category-icon">👕</div>
                <h3>Fashion</h3>
                <p>Clothing, Shoes & Accessories</p>
                <span className="category-cta">Shop Now →</span>
              </div>
            </Link>
            
            <Link to="/products?category=Home" className="category-card category-home">
              <div className="category-content">
                <div className="category-icon">🏠</div>
                <h3>Home & Living</h3>
                <p>Decor, Kitchen & Furniture</p>
                <span className="category-cta">Shop Now →</span>
              </div>
            </Link>
            
            <Link to="/products?category=Sports" className="category-card category-sports">
              <div className="category-content">
                <div className="category-icon">⚽</div>
                <h3>Sports & Fitness</h3>
                <p>Equipment & Activewear</p>
                <span className="category-cta">Shop Now →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Elevate Your Style?</h2>
            <p>Join thousands of satisfied customers and discover amazing products today!</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-cta-primary">
                Start Shopping
              </Link>
              <Link to="/register" className="btn btn-cta-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;