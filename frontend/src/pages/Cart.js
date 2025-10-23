import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('https://full-stack-e-commerce-style-hub-platform.onrender.com/');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`https://full-stack-e-commerce-style-hub-platform.onrender.com/api/cart/update/${productId}`, {
        quantity: newQuantity
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`https://full-stack-e-commerce-style-hub-platform.onrender.com//api/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h2>Please login to view your cart</h2>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  if (!cart) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h3>Your cart is empty</h3>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div>
            {cart.items.map(item => (
              <div key={item.product._id} className="cart-item">
                <img 
                  src={`https://full-stack-e-commerce-style-hub-platform.onrender.com/uploads/${item.product.image}`} 
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  onClick={() => removeItem(item.product._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
            <h2>Total: ${cart.total?.toFixed(2)}</h2>
            <button 
              onClick={() => navigate('/checkout')}
              className="btn btn-success"
              style={{ marginTop: '1rem' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
