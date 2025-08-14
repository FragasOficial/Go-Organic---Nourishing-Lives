// models/product.model.js
const sql = require('mssql');
const config = require('../config/db.config');

const Product = {
  create: async (productData) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('seller_id', sql.Int, productData.seller_id)
        .input('name', sql.NVarChar, productData.name)
        .input('description', sql.NVarChar, productData.description)
        .input('price', sql.Decimal(10, 2), productData.price)
        .input('image', sql.NVarChar, productData.image)
        .query(`
          INSERT INTO Products (seller_id, name, description, price, image)
          VALUES (@seller_id, @name, @description, @price, @image);
          SELECT SCOPE_IDENTITY() AS id;
        `);
      
      return result.recordset[0].id;
    } catch (err) {
      console.error('Erro ao criar o produto:', err);
      throw err;
    }
  }
};

module.exports = Product;