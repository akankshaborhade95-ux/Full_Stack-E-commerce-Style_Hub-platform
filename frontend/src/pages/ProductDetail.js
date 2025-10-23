import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://full-stack-e-commerce-style-hub-platform.onrender.com/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getProductImage = (productId) => {
    return productImages[productId] || productImages[1];
  };

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post('https://full-stack-e-commerce-style-hub-platform.onrender.com/api/cart/add', {
        productId: id,
        quantity
      });
      setMessage('✅ Product added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('❌ Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {message && (
        <div style={{
          background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: message.includes('✅') ? '#065f46' : '#dc2626',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: `1px solid ${message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', margin: '2rem 0' }}>
        <div>
          <img 
            src={getProductImage(product.id)} 
            alt={product.name}
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
              {"⭐".repeat(Math.floor(product.ratings || 4))}
            </span>
            <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>({product.ratings || 4.0})</span>
          </div>
          <p style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold', margin: '1.5rem 0' }}>
            ${product.price}
          </p>
          <p style={{ margin: '1.5rem 0', lineHeight: '1.7', fontSize: '1.1rem', color: '#4b5563' }}>
            {product.description}
          </p>
          
          <div style={{ margin: '2rem 0' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Quantity:
            </label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span style={{ padding: '0 1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              onClick={addToCart} 
              className="btn btn-primary" 
              style={{ flex: 2, padding: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Adding to Cart...' : '🛒 Add to Cart'}
            </button>
            <button 
              onClick={() => navigate('/cart')} 
              className="btn btn-success" 
              style={{ flex: 1, padding: '1rem' }}
            >
              View Cart
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Product Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <strong>Category:</strong> {product.category}
              </div>
              <div>
                <strong>Stock:</strong> {product.stock} units available
              </div>
              <div>
                <strong>Rating:</strong> {product.ratings || 4.0}/5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
