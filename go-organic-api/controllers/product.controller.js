const Product = require("../models/product.model");

// Buscar todos os produtos (público)
exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).send({ message: "Erro ao buscar os produtos." });
  }
};

// Criar produto (vendedor autenticado)
exports.createProduct = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: "É necessário estar autenticado para cadastrar um produto." });
    }

    const seller_id = req.userId;
    const {
      name,
      description,
      price,
      image, // vem do frontend como 'image'
      city,
      category_id,
      available_quantity,
      unit_of_measure
    } = req.body;

    await Product.create({
      name,
      description,
      price,
      seller_id,
      state: "SP", // TODO: pegar do perfil do usuário no futuro
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

// Buscar produtos por vendedor (público)
exports.findBySeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await Product.findAll({ where: { seller_id: sellerId } });

    if (!products || products.length === 0) {
      return res.status(404).send({ message: "Nenhum produto encontrado para este vendedor." });
    }

    res.status(200).send(products);
  } catch (err) {
    console.error("Erro ao buscar produtos do vendedor:", err);
    res.status(500).send({ message: "Erro ao buscar produtos do vendedor." });
  }
};

// Atualizar produto (somente do próprio vendedor)
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const sellerId = req.userId;

    // Busca garantindo que o produto pertence ao vendedor autenticado
    const product = await Product.findOne({ where: { id, seller_id: sellerId } });
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado ou não pertence a este vendedor." });
    }

    // Campos permitidos para atualização
    const {
      name,
      description,
      price,
      available_quantity,
      unit_of_measure,
      city,
      category_id,
      image // opcional, mapeado para image_url
    } = req.body;

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.available_quantity = available_quantity ?? product.available_quantity;
    product.unit_of_measure = unit_of_measure ?? product.unit_of_measure;
    product.city = city ?? product.city;
    product.category_id = category_id ?? product.category_id;
    if (typeof image !== "undefined") product.image_url = image;

    await product.save();

    res.status(200).send({ message: "Produto atualizado com sucesso.", product });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).send({ message: "Erro ao atualizar produto." });
  }
};

// Excluir produto (somente do próprio vendedor)
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const sellerId = req.userId;

    const deleted = await Product.destroy({ where: { id, seller_id: sellerId } });
    if (!deleted) {
      return res.status(404).send({ message: "Produto não encontrado ou não pertence a este vendedor." });
    }

    res.status(200).send({ message: "Produto excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).send({ message: "Erro ao excluir produto." });
  }
};
