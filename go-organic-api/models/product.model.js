// models/product.model.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
    state: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    image_url: { type: DataTypes.STRING },
    category_id: { type: DataTypes.INTEGER },
    available_quantity: { type: DataTypes.INTEGER },
    unit_of_measure: { type: DataTypes.STRING },
  }, {
    tableName: "Products",
    timestamps: false,
  });

  return Product;
};
