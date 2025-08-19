const db = require("../models");
const Order = db.Order;
const Product = db.Product;
const User = db.User;

// Criar novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body; // [{ productId, quantity }]
    const userId = req.userId; // vem do token JWT

    if (!products || products.length === 0) {
      return res.status(400).send({ message: "Nenhum produto informado." });
    }

    const createdOrders = [];

    for (let item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) continue;

      const order = await Order.create({
        user_id: userId,               // ✅ campo consistente com o model
        product_id: product.id,        // ✅ ajustado para corresponder ao model
        seller_id: product.seller_id,  // ✅ campo consistente com o model Product
        quantity: item.quantity,
        total: product.price * item.quantity,
        status: "PENDENTE"
      });

      createdOrders.push(order);
    }

    res.status(201).send({
      message: "Pedido criado com sucesso!",
      orders: createdOrders
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar pedido." });
  }
};

// Listar pedidos de um cliente
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.userId },
      include: [{ model: Product }]
    });

    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao buscar pedidos do cliente." });
  }
};

// Listar pedidos de um vendedor
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const orders = await Order.findAll({
      where: { seller_id: sellerId },
      include: [
        { model: Product },
        {
          model: User,
          as: "user", // ✅ conforme relação definida em index.js
          attributes: ["id", "username", "email"]
        }
      ]
    });

    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao buscar pedidos do vendedor." });
  }
};

// Atualizar status do pedido
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send({ message: "Pedido não encontrado." });
    }

    order.status = status;
    await order.save();

    res.send({ message: "Status atualizado com sucesso!", order });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao atualizar status do pedido." });
  }
};
