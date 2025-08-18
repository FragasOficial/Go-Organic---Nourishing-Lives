// routes/admin.routes.js
const { authJwt } = require("../middlewares");
const admin = require("../controllers/admin.controller");

module.exports = function (app) {
  // Middleware para CORS (se necessário)
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // =======================
  // 📊 DASHBOARD
  // =======================
  app.get(
    "/api/admin/stats",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.getStats
  );

  // =======================
  // 👥 USERS
  // =======================
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findAllUsers
  );

  // =======================
  // 📦 PRODUCTS
  // =======================
  app.get(
    "/api/admin/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findAllProducts
  );

  app.put(
    "/api/admin/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.updateProduct
  );

  app.delete(
    "/api/admin/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.deleteProduct
  );

  // =======================
  // 🛒 ORDERS
  // =======================
  app.put(
    "/api/admin/orders/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.updateOrder
  );

  app.delete(
    "/api/admin/orders/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.deleteOrder
  );

  // =======================
  // 👨‍👩‍👧 CLIENTS
  // =======================
  app.get(
    "/api/admin/clients",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findAllClients
  );

  app.get(
    "/api/admin/clients/:id/orders",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findClientOrders
  );

  app.delete(
    "/api/admin/clients/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.deleteClient
  );

  // =======================
  // 🏪 SELLERS
  // =======================
  app.get(
    "/api/admin/sellers",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findAllSellers
  );

  app.get(
    "/api/admin/sellers/:id/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.findSellerProducts
  );

  app.delete(
    "/api/admin/sellers/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admin.deleteSeller
  );
};
