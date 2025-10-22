import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Real product images from Unsplash
  const productImages = {
    1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", // headphones
    2: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop", // iphone
    3: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", // tv
    4: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", // shoes
    5: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", // tshirt
    6: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop", // book
    7: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop", // coffee
    8: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", // yoga mat
    9: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", // mouse
    10: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop" // backpack
  };

  // Product icons for different categories
  const productIcons = {
    Electronics: '📱',
    Fashion: '👕',
    Books: '📚',
    Home: '🏠',
    Sports: '⚽',
    default: '📦'
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Products loaded:', response.data);
      setProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const getProductIcon = (category) => {
    return productIcons[category] || productIcons.default;
  };

  const getProductImage = (productId) => {
    return productImages[productId] || productImages[1]; // fallback to first image
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <p>Make sure your backend is running on http://localhost:5000</p>
          <button onClick={fetchProducts} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ margin: '2rem 0' }}>
        <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Our Products</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
          Discover amazing products across various categories
        </p>
        
        {/* Search and Filter Section */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label className="form-label">Search Products</label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
              
              <div>
                <label className="form-label">Filter by Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-control"
                  style={{ minWidth: '150px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Quick Filters */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory('')}
              >
                All Products
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getProductIcon(category)} {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ color: 'white', marginBottom: '1rem' }}>
          <strong>{filteredProducts.length}</strong> products found
          {selectedCategory && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={getProductImage(product.id)} 
                alt={product.name}
                className="product-image"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="product-info">
                <div className="product-rating">
                  <span className="rating-stars">{"⭐".repeat(Math.floor(product.ratings || 4))}</span>
                  <span>({product.ratings || 4.0})</span>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <div className="product-price">${product.price}</div>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    backgroundColor: '#10b981', 
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {product.category}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <Link to={`/product/${product.id}`} className="btn btn-primary" style={{ flex: 1 }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => { setSelectedCategory(''); setSearchTerm(''); }} 
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {products.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No products available</h3>
            <p>Please check if the database is properly seeded</p>
            <button onClick={fetchProducts} className="btn btn-primary">
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;