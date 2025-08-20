// models/user.model.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    user_type: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    business_name: { type: DataTypes.STRING },
    cnpj: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  }, {
    tableName: "Users",
    timestamps: false,
  });

  return User;
};
