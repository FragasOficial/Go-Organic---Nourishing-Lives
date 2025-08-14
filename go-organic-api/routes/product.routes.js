// routes/product.routes.js
const controller = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/auth.jwt');

module.exports = function(app) {
    app.post('/api/products', [verifyToken], controller.createProduct);
};