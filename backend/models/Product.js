const db = require('../database');

class Product {
  static async findAll(filters = {}) {
    try {
      let sql = 'SELECT * FROM products WHERE 1=1';
      const params = [];

      if (filters.category) {
        sql += ' AND category = ?';
        params.push(filters.category);
      }

      if (filters.search) {
        sql += ' AND (name LIKE ? OR description LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm);
      }

      sql += ' ORDER BY created_at DESC';

      const products = await db.allAsync(sql, params);
      
      // Convert price to number for consistency
      return products.map(product => ({
        ...product,
        price: parseFloat(product.price),
        ratings: parseFloat(product.ratings),
        stock: parseInt(product.stock)
      }));
    } catch (error) {
      console.error('Error in Product.findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const product = await db.getAsync('SELECT * FROM products WHERE id = ?', [id]);
      if (product) {
        return {
          ...product,
          price: parseFloat(product.price),
          ratings: parseFloat(product.ratings),
          stock: parseInt(product.stock)
        };
      }
      return null;
    } catch (error) {
      console.error('Error in Product.findById:', error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      const { name, description, price, category, image, stock, ratings } = productData;
      
      const result = await db.runAsync(
        `INSERT INTO products (name, description, price, category, image, stock, ratings) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, price, category, image || 'default.jpg', stock || 0, ratings || 0]
      );
      
      return this.findById(result.id);
    } catch (error) {
      console.error('Error in Product.create:', error);
      throw error;
    }
  }

  static async deleteAll() {
    try {
      await db.runAsync('DELETE FROM products');
    } catch (error) {
      console.error('Error in Product.deleteAll:', error);
      throw error;
    }
  }
}

module.exports = Product;