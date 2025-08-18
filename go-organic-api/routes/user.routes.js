const authJwt = require("../middleware/auth.jwt");
const controller = require("../controllers/user.controller");

console.log("Controller carregado:", controller);


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);
    
    // Rotas de teste
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    
    // Nova rota para o perfil do cliente
    app.get("/api/user/profile", [authJwt.verifyToken], controller.getUserProfile);
    
    // Nova rota para os pedidos do cliente
    app.get("/api/user/orders", [authJwt.verifyToken], controller.getUserOrders);
};