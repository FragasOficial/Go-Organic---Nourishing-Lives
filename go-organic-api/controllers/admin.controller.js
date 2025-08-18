// controllers/admin.controller.js
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config"); // Importação corrigida
const User = require("../models/user.model"); // Importação direta dos modelos
const Product = require("../models/product.model");
const Order = require("../models/order.model");

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
      const users = await User.count();
      const products = await Product.count();
      const orders = await Order.count();

      res.json({
        totalUsers: users,
        totalProducts: products,
        totalOrders: orders
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
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role'],
        raw: true
      });
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
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'image_url', 'available_quantity', 'seller_id'],
        raw: true
      });
      res.json(products);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, image_url, available_quantity } = req.body;

      await Product.update(
        { name, description, price, image_url, available_quantity },
        { where: { id } }
      );

      res.json({ message: "Produto atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.destroy({ where: { id } });
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

      await Order.update(
        { status },
        { where: { id } }
      );

      res.json({ message: "Pedido atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await Order.destroy({ where: { id } });
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
      const clients = await User.findAll({
        attributes: ['id', 'name', 'email'],
        where: { role: 'cliente' },
        raw: true
      });
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
      await User.destroy({ 
        where: { 
          id,
          role: 'cliente' 
        } 
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
      const sellers = await User.findAll({
        attributes: ['id', 'name', 'email'],
        where: { role: 'vendedor' },
        raw: true
      });
      res.json(sellers);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async findSellerProducts(req, res) {
    try {
      const { id } = req.params;
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'image_url', 'available_quantity'],
        where: { seller_id: id },
        raw: true
      });
      res.json(products);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  async deleteSeller(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ 
        where: { 
          id,
          role: 'vendedor' 
        } 
      });
      res.json({ message: "Vendedor deletado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};