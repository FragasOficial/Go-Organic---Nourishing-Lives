const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    // Adiciona uma verificação para garantir que o userId existe
    if (!req.userId) {
      return res.status(401).send({ message: "É necessário estar autenticado para cadastrar um produto." });
    }

    const seller_id = req.userId;
    const { name, description, price, image } = req.body;

    const productId = await Product.create({
      seller_id,
      name,
      description,
      price,
      image,
    });

    res.status(201).send({ message: "Produto cadastrado com sucesso!", productId });
  } catch (err) {
    console.error('Erro no controller ao cadastrar produto:', err);
    res.status(500).send({ message: err.message });
  }
};