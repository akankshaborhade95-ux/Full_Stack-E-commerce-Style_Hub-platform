const db = require('../database');

class Order {
  static async create(orderData) {
    const { user_id, items, total_amount, shipping_address, payment_method } = orderData;
    
    return new Promise((resolve, reject) => {
      db.serialize(async () => {
        try {
          // Create order
          const orderResult = await db.runAsync(
            `INSERT INTO orders (user_id, total_amount, shipping_address, payment_method) 
             VALUES (?, ?, ?, ?)`,
            [user_id, total_amount, JSON.stringify(shipping_address), payment_method]
          );

          const orderId = orderResult.id;

          // Add order items
          for (const item of items) {
            await db.runAsync(
              `INSERT INTO order_items (order_id, product_id, quantity, price) 
               VALUES (?, ?, ?, ?)`,
              [orderId, item.product_id, item.quantity, item.price]
            );
          }

          // Clear user's cart
          await db.runAsync('DELETE FROM cart WHERE user_id = ?', [user_id]);

          const order = await this.findById(orderId);
          resolve(order);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  static async findByUserId(userId) {
    const orders = await db.allAsync(
      `SELECT o.*, 
              json_group_array(
                json_object(
                  'id', oi.id,
                  'product_id', oi.product_id,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'name', p.name,
                  'image', p.image,
                  'category', p.category
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    // Parse JSON items
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items),
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : {}
    }));
  }

  static async findById(orderId) {
    const order = await db.getAsync(
      `SELECT o.*, 
              json_group_array(
                json_object(
                  'id', oi.id,
                  'product_id', oi.product_id,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'name', p.name,
                  'image', p.image,
                  'category', p.category
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = ?
       GROUP BY o.id`,
      [orderId]
    );

    if (!order) return null;

    return {
      ...order,
      items: JSON.parse(order.items),
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : {}
    };
  }
}

module.exports = Order;