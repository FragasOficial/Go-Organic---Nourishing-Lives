const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");

// Importa modelos
const User = require("./user.model");
const Product = require("./product.model");
const Order = require("./order.model");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Product = Product;
db.Order = Order;

// 🔗 Relacionamentos
db.User.hasMany(db.Product, { foreignKey: "seller_id", as: "products" });
db.Product.belongsTo(db.User, { foreignKey: "seller_id", as: "seller" });

db.User.hasMany(db.Order, { foreignKey: "user_id", as: "orders" });
db.Order.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.Product.hasMany(db.Order, { foreignKey: "product_id", as: "orders" });
db.Order.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });

module.exports = db;
