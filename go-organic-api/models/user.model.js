// models/user.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_type: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  business_name: {
    type: DataTypes.STRING
  },
  cnpj: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: "Users",   // nome da tabela no SQL Server
  timestamps: false     // se sua tabela não tem createdAt/updatedAt
});

module.exports = User;
