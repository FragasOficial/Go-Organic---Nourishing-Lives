const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Criar pedido (cliente)
  app.post("/api/orders", [authJwt.verifyToken], controller.createOrder);

  // Pedidos do cliente logado
  app.get("/api/orders/user", [authJwt.verifyToken], controller.getUserOrders);

  // Pedidos de um vendedor
  app.get("/api/orders/seller/:sellerId", [authJwt.verifyToken], controller.getSellerOrders);

  // Atualizar status (somente vendedor do pedido ou admin)
  app.put("/api/orders/:orderId/status", [authJwt.verifyToken], controller.updateOrderStatus);
};
