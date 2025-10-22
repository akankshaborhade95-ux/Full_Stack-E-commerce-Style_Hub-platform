const db = require('../database');

class Cart {
  static async getCart(userId) {
    const cartItems = await db.allAsync(
      `SELECT c.*, p.name, p.price, p.image, p.category 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
      user_id: userId,
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    };
  }

  static async addItem(userId, productId, quantity = 1) {
    // Check if item already exists in cart
    const existingItem = await db.getAsync(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existingItem) {
      // Update quantity
      await db.runAsync(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    } else {
      // Add new item
      await db.runAsync(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
    }

    return this.getCart(userId);
  }

  static async updateItem(userId, productId, quantity) {
    if (quantity < 1) {
      await this.removeItem(userId, productId);
    } else {
      await db.runAsync(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    }

    return this.getCart(userId);
  }

  static async removeItem(userId, productId) {
    await db.runAsync(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    return this.getCart(userId);
  }

  static async clearCart(userId) {
    await db.runAsync('DELETE FROM cart WHERE user_id = ?', [userId]);
  }
}

module.exports = Cart;