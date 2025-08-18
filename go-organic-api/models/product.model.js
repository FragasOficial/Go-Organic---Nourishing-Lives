// models/product.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  },
  category_id: {
    type: DataTypes.INTEGER
  },
  available_quantity: {
    type: DataTypes.INTEGER
  },
  unit_of_measure: {
    type: DataTypes.STRING
  }
}, {
  tableName: "Products",  // Nome da tabela no SQL Server
  timestamps: false       // Se sua tabela não tiver createdAt/updatedAt
});

module.exports = Product;
