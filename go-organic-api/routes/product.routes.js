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

    app.post(
        "/api/products",
        [authJwt.verifyToken, authJwt.isVendedor],
        controller.createProduct
    );
    
    // Rota para buscar todos os produtos (pública)
    app.get("/api/products", controller.findAllProducts);
};