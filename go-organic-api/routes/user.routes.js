const authJwt = require("../middleware/auth.jwt");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Perfil do usuário logado
  app.get("/api/users/me", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 GET /api/users/me chamado");
    controller.getUserProfile(req, res, next);
  });

  // Pedidos do usuário logado
  app.get("/api/users/orders", [authJwt.verifyToken], (req, res, next) => {
    console.log("📩 GET /api/users/orders chamado");
    controller.getUserOrders(req, res, next);
  });
};
