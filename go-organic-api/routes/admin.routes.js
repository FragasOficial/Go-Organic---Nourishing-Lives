const controller = require("../controllers/admin.controller");
const authJwt = require("../middleware/auth.jwt");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/admin/stats",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getStats
    );
    
    app.get(
        "/api/admin/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllUsers
    );

    app.get(
        "/api/admin/products",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllProducts
    );
};