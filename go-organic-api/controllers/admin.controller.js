// controllers/admin.controller.js
const db = require("../models");
const sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

/**
 * ADMIN CONTROLLER
 * Funções de gerenciamento para administradores
 */
module.exports = {
  // =======================
  // 📊 DASHBOARD
  // =======================
  async getStats(req, res) {
    try {
      const [users] = await sequelize.query("SELECT COUNT(*) as total FROM Users", { type: QueryTypes.SELECT });
      const [products] = await sequelize.query("SELECT COUNT(*) as total FROM Products", { type: QueryTypes.SELECT });
      const [orders] = await sequelize.query("SELECT COUNT(*) as total FROM Orders", { type: QueryTypes.SELECT });

      res.json({
        totalUsers: users.total,
        totalProducts: products.total,
        totalOrders: orders.total
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  // =======================
  // 👥 USERS
  // =======================
  async findAllUsers(req, res) {
    try {
      const users = await sequelize.query("SELECT id, name, email, role FROM Users", { type: QueryTypes.SELECT });
      res.json(users);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  // =======================
  // 📦 PRODUCTS
  // =======================
  async findAllProducts(req, res) {
    try {
      const products = await sequelize.query(
        "SELECT id, name, description, price, image_url, available_quantity, seller_id FROM Products",
        { type: QueryTypes.SELECT }
      );
      res.json(products);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, image_url, available_quantity } = req.body;

      await sequelize.query(
        `UPDATE Products 
         SET name = ?, description = ?, price = ?, image_url = ?, available_quantity = ? 
         WHERE id = ?`,
        { replacements: [name, description, price, image_url, available_quantity, id] }
      );

      res.json({ message: "Produto atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await sequelize.query("DELETE FROM Products WHERE id = ?", { replacements: [id] });
      res.json({ message: "Produto deletado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  // =======================
  // 🛒 ORDERS
  // =======================
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await sequelize.query("UPDATE Orders SET status = ? WHERE id = ?", {
        replacements: [status, id],
      });

      res.json({ message: "Pedido atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await sequelize.query("DELETE FROM Orders WHERE id = ?", { replacements: [id] });
      res.json({ message: "Pedido deletado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  // =======================
  // 👨‍👩‍👧 CLIENTS
  // =======================
  async findAllClients(req, res) {
    try {
      const clients = await sequelize.query(
        "SELECT id, name, email FROM Users WHERE role = 'client'",
        { type: QueryTypes.SELECT }
      );
      res.json(clients);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async findClientOrders(req, res) {
    try {
      const { id } = req.params;
      const orders = await sequelize.query(
        `SELECT o.id, o.status, o.createdAt, oi.product_id, oi.quantity
         FROM Orders o
         JOIN OrderItems oi ON o.id = oi.order_id
         WHERE o.user_id = ?`,
        { replacements: [id], type: QueryTypes.SELECT }
      );
      res.json(orders);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteClient(req, res) {
    try {
      const { id } = req.params;
      await sequelize.query("DELETE FROM Users WHERE id = ? AND role = 'client'", {
        replacements: [id],
      });
      res.json({ message: "Cliente deletado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  // =======================
  // 🏪 SELLERS
  // =======================
  async findAllSellers(req, res) {
    try {
      const sellers = await sequelize.query(
        "SELECT id, name, email FROM Users WHERE role = 'seller'",
        { type: QueryTypes.SELECT }
      );
      res.json(sellers);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async findSellerProducts(req, res) {
    try {
      const { id } = req.params;
      const products = await sequelize.query(
        "SELECT id, name, description, price, image_url, available_quantity FROM Products WHERE seller_id = ?",
        { replacements: [id], type: QueryTypes.SELECT }
      );
      res.json(products);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteSeller(req, res) {
    try {
      const { id } = req.params;
      await sequelize.query("DELETE FROM Users WHERE id = ? AND role = 'seller'", {
        replacements: [id],
      });
      res.json({ message: "Vendedor deletado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
