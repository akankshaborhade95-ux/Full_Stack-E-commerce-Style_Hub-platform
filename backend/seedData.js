const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'ecommerce.db');
const db = new sqlite3.Database(dbPath);

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life",
    price: 129.99,
    category: "Electronics",
    stock: 25,
    image: "headphones.jpg",
    ratings: 4.5
  },
  {
    name: "iPhone 14 Pro",
    description: "Latest Apple iPhone with A16 Bionic chip and 48MP camera",
    price: 999.99,
    category: "Electronics",
    stock: 15,
    image: "iphone.jpg",
    ratings: 4.8
  },
  {
    name: "Samsung 4K Smart TV",
    description: "55-inch 4K UHD Smart TV with HDR and streaming apps",
    price: 599.99,
    category: "Electronics",
    stock: 10,
    image: "tv.jpg",
    ratings: 4.3
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with responsive cushioning",
    price: 149.99,
    category: "Fashion",
    stock: 30,
    image: "shoes.jpg",
    ratings: 4.6
  },
  {
    name: "Cotton T-Shirt Pack",
    description: "Pack of 3 premium cotton t-shirts in various colors",
    price: 29.99,
    category: "Fashion",
    stock: 50,
    image: "tshirt.jpg",
    ratings: 4.2
  },
  {
    name: "JavaScript Programming Book",
    description: "Comprehensive guide to modern JavaScript development",
    price: 39.99,
    category: "Books",
    stock: 20,
    image: "book.jpg",
    ratings: 4.7
  },
  {
    name: "Coffee Maker Machine",
    description: "Automatic coffee maker with programmable timer",
    price: 89.99,
    category: "Home",
    stock: 12,
    image: "coffee-maker.jpg",
    ratings: 4.4
  },
  {
    name: "Yoga Mat Premium",
    description: "Eco-friendly yoga mat with superior grip and cushioning",
    price: 45.99,
    category: "Sports",
    stock: 18,
    image: "yoga-mat.jpg",
    ratings: 4.5
  },
  {
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting",
    price: 79.99,
    category: "Electronics",
    stock: 22,
    image: "gaming-mouse.jpg",
    ratings: 4.6
  },
  {
    name: "Backpack Laptop Bag",
    description: "Water-resistant laptop backpack with USB charging port",
    price: 49.99,
    category: "Fashion",
    stock: 35,
    image: "backpack.jpg",
    ratings: 4.3
  }
];

// Function to seed database
function seedDatabase() {
  console.log('🌱 Starting to add products to database...');
  
  // First, delete any existing products
  db.run('DELETE FROM products', function(err) {
    if (err) {
      console.error('❌ Error clearing products:', err);
      return;
    }
    
    console.log('🗑️  Cleared old products');
    
    // Insert new products
    let insertedCount = 0;
    
    sampleProducts.forEach((product, index) => {
      const sql = `INSERT INTO products (name, description, price, category, image, stock, ratings) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
      db.run(sql, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.image,
        product.stock,
        product.ratings
      ], function(err) {
        if (err) {
          console.error(`❌ Error inserting product ${product.name}:`, err);
        } else {
          insertedCount++;
          console.log(`✅ Added: ${product.name} - $${product.price}`);
        }
        
        // When all products are inserted
        if (insertedCount === sampleProducts.length) {
          console.log('\n🎉 SUCCESS! Database seeded successfully!');
          console.log(`📦 Total products added: ${insertedCount}`);
          console.log('\nYou can now start the server with: npm run dev');
          db.close();
        }
      });
    });
  });
}

// Check if database exists and has products table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='products'", (err, row) => {
  if (err) {
    console.error('❌ Database error:', err);
    return;
  }
  
  if (row) {
    console.log('✅ Products table found, seeding data...');
    seedDatabase();
  } else {
    console.log('❌ Products table not found. Please run the server first to create tables.');
    console.log('Run: npm run dev (wait for tables to create), then stop it with Ctrl+C, then run: npm run seed');
    db.close();
  }
});