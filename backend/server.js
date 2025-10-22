const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// 10 Products for E-commerce Store
const products = [
  // Electronics
  { id: 1, name: "Wireless Bluetooth Headphones", description: "Noise cancelling with 30hr battery", price: 129.99, category: "Electronics", stock: 25, ratings: 4.5 },
  { id: 2, name: "iPhone 15 Pro", description: "Latest Apple smartphone with 48MP camera", price: 999.99, category: "Electronics", stock: 15, ratings: 4.8 },
  { id: 3, name: "Samsung 4K Smart TV", description: "55-inch 4K UHD with HDR", price: 599.99, category: "Electronics", stock: 10, ratings: 4.3 },
  { id: 4, name: "Gaming Laptop", description: "RTX 4060, 16GB RAM, 1TB SSD", price: 1299.99, category: "Electronics", stock: 8, ratings: 4.7 },
  { id: 5, name: "Wireless Gaming Mouse", description: "RGB lighting, 16000 DPI", price: 79.99, category: "Electronics", stock: 22, ratings: 4.6 },

  // Fashion
  { id: 6, name: "Nike Air Max 270", description: "Comfortable running shoes", price: 149.99, category: "Fashion", stock: 30, ratings: 4.6 },
  { id: 7, name: "Cotton T-Shirt Pack", description: "Pack of 3 premium cotton t-shirts", price: 29.99, category: "Fashion", stock: 50, ratings: 4.2 },
  { id: 8, name: "Denim Jacket", description: "Classic denim jacket for all seasons", price: 79.99, category: "Fashion", stock: 20, ratings: 4.5 },

  // Home
  { id: 9, name: "Coffee Maker", description: "Programmable coffee maker with grinder", price: 89.99, category: "Home", stock: 12, ratings: 4.4 },

  // Sports
  { id: 10, name: "Yoga Mat", description: "Eco-friendly yoga mat with superior grip", price: 45.99, category: "Sports", stock: 18, ratings: 4.5 }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Simple registration (for testing)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ 
    token: 'test-token-123',
    user: { id: 1, name: name, email: email }
  });
});

// Simple login (for testing)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({ 
    token: 'test-token-123',
    user: { id: 1, name: 'Test User', email: email }
  });
});

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log('🎉 =================================');
  console.log('✅ BACKEND SERVER STARTED!');
  console.log('📍 Port: ' + PORT);
  console.log('🔗 URL: http://localhost:' + PORT);
  console.log('📦 Products: 10 items available');
  console.log('💡 KEEP THIS TERMINAL OPEN!');
  console.log('🎉 =================================');
});