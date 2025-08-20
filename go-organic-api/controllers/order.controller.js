// controllers/order.controller.js

const db = require("../models");
const Order = db.order;
const Product = db.product;
const User = db.user;

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: "product" },
        { model: User, as: "user" }
      ]
    });

    res.status(200).send(orders);
  } catch (err) {
    console.error("❌ Erro ao buscar pedidos:", err);
    res.status(500).send({ message: "Erro ao buscar pedidos do usuário" });
  }
};
