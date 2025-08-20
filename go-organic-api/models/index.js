const Sequelize = require("sequelize");
const sequelize = require("../config/db.config.js"); // importa sua conexão pronta

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Product = require("./product.model.js")(sequelize, Sequelize);
db.Order = require("./order.model.js")(sequelize, Sequelize);

// Definição das associações
db.User.hasMany(db.Product, { foreignKey: "seller_id", as: "products" });
db.Product.belongsTo(db.User, { foreignKey: "seller_id", as: "seller" });

db.User.hasMany(db.Order, { foreignKey: "user_id", as: "orders" });
db.Order.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.Order.belongsToMany(db.Product, {
  through: "OrderProducts",
  foreignKey: "order_id",
  as: "products"
});
db.Product.belongsToMany(db.Order, {
  through: "OrderProducts",
  foreignKey: "product_id",
  as: "orders"
});

module.exports = db;
