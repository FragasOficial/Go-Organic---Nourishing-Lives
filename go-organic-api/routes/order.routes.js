const authJwt = require("../middleware/auth.jwt");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Criar pedido (cliente)
  app.post("/api/orders", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 POST /api/orders chamado");
    controller.createOrder(req, res, next);
  });

  // Pedidos do cliente logado
  app.get("/api/orders/user", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 GET /api/orders/user chamado");
    controller.getUserOrders(req, res, next);
  });

  // 🔥 Alias para compatibilidade com o frontend (painel-cliente.js)
  app.get("/api/orders/my-orders", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 GET /api/orders/my-orders chamado");
    controller.getUserOrders(req, res, next);
  });

  // Pedidos de um vendedor
  app.get("/api/orders/seller/:sellerId", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 GET /api/orders/seller/" + req.params.sellerId + " chamado");
    controller.getSellerOrders(req, res, next);
  });

  // Atualizar status (somente vendedor do pedido ou admin)
  app.put("/api/orders/:orderId/status", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 PUT /api/orders/" + req.params.orderId + "/status chamado");
    controller.updateOrderStatus(req, res, next);
  });
};
