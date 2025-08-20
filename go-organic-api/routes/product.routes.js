// routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// ============================
// 📌 Rotas de Produtos
// ============================

// Buscar todos os produtos
router.get("/", productController.findAllProducts);

// Buscar produto por ID
router.get("/:id", productController.findProductById);

// Criar novo produto
router.post("/", productController.createProduct);

// Atualizar produto
router.put("/:id", productController.updateProduct);

// Deletar produto
router.delete("/:id", productController.deleteProduct);

module.exports = router;
