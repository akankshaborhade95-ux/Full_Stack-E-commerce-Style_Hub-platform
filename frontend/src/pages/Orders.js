import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://full-stack-e-commerce-style-hub-platform.onrender.com/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h2>Please login to view your orders</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h3>No orders found</h3>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <div>
                    <span style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: '20px',
                      backgroundColor: 
                        order.status === 'Delivered' ? '#27ae60' :
                        order.status === 'Shipped' ? '#3498db' :
                        order.status === 'Processing' ? '#f39c12' : '#95a5a6',
                      color: 'white'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                
                <h4>Items:</h4>
                {order.items.map(item => (
                  <div key={item.product._id} style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <img 
                      src={`https://full-stack-e-commerce-style-hub-platform.onrender.com/uploads/${item.product.image}`} 
                      alt={item.product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h5>{item.product.name}</h5>
                      <p>Quantity: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
