// controllers/product.controller.js
const db = require("../models");
const Product = db.Product;

// ============================
// 📌 Buscar todos os produtos
// ============================
exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: db.User,
          as: "seller", // 🔗 corresponde ao alias definido no index.js
          attributes: ["id", "name", "email", "business_name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

// ============================
// 📌 Buscar produto por ID
// ============================
exports.findProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: db.User,
          as: "seller",
          attributes: ["id", "name", "email", "business_name"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ message: "Erro ao buscar produto." });
  }
};

// ============================
// 📌 Criar novo produto
// ============================
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, seller_id } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      seller_id,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto." });
  }
};

// ============================
// 📌 Atualizar produto
// ============================
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Product.update(req.body, { where: { id } });

    if (updated === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

// ============================
// 📌 Deletar produto
// ============================
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Product.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto removido com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
};
