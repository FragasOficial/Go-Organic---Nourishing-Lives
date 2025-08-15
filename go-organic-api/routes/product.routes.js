// routes/product.routes.js
const controller = require("../controllers/product.controller");
const authJwt = require("../middleware/auth.jwt"); // Caminho de importação corrigido

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Rota para criar um produto, protegida pelo middleware de autenticação e verificação de vendedor
    app.post(
        "/api/products",
        [authJwt.verifyToken, authJwt.isVendedor], // Uso correto do objeto authJwt
        controller.createProduct
    );
};