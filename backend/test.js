const db = require('./database');

// Test database connection
console.log('🧪 Testing database connection...');

db.allAsync("SELECT name FROM sqlite_master WHERE type='table'")
  .then(tables => {
    console.log('✅ Database tables:', tables.map(t => t.name));
    
    // Test products table
    return db.allAsync("SELECT COUNT(*) as count FROM products");
  })
  .then(result => {
    console.log(`✅ Products count: ${result[0].count}`);
    console.log('🎉 Database test passed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  });