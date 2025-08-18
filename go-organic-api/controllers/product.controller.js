const Product = require("../models/product.model");

// Buscar todos os produtos
exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).send({ message: "Erro ao buscar os produtos." });
  }
};

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: "É necessário estar autenticado para cadastrar um produto." });
    }

    const seller_id = req.userId;
    const { name, description, price, image, city, category_id, available_quantity, unit_of_measure } = req.body;

    await Product.create({
      name,
      description,
      price,
      seller_id,
      state: "SP", // TODO: pode vir do usuário futuramente
      city,
      image_url: image,
      category_id,
      available_quantity,
      unit_of_measure
    });

    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).send({ message: err.message });
  }
};
