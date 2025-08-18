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

  // Criar produto (apenas usuário autenticado com papel "seller")
  app.post(
    "/api/products",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.createProduct
  );

  // Buscar todos os produtos (público)
  app.get("/api/products", controller.findAllProducts);
};
