const db = require('../database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Insert user
      const result = await db.runAsync(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
      
      // Return user without password
      return await this.findById(result.id);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await db.getAsync('SELECT * FROM users WHERE email = ?', [email]);
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await db.getAsync('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }
}

module.exports = User;