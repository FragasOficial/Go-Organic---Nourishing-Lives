const controller = require("../controllers/product.controller");
const authJwt = require("../middleware/auth.jwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Criar produto (apenas vendedor autenticado)
  app.post(
    "/api/products",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.createProduct
  );

  // Buscar todos os produtos (público)
  app.get("/api/products", controller.findAllProducts);

  // Buscar produtos de um vendedor específico (público)
  app.get("/api/products/seller/:sellerId", controller.findBySeller);

  // Atualizar produto (apenas o próprio vendedor dono do produto)
  app.put(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.updateProduct
  );

  // Excluir produto (apenas o próprio vendedor dono do produto)
  app.delete(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.deleteProduct
  );
};
