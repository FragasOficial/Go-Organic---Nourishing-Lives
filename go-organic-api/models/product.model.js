const sql = require('mssql');
const config = require('../config/db.config');

const Product = {
  create: async (productData) => {
    try {
      const pool = await sql.connect(config);
      // 🐛 SOLUÇÃO: Certifique-se de que todas as variáveis são extraídas
      const { seller_id, name, description, price, image_url, state, city, category_id, available_quantity, unit_of_measure } = productData;
      
      const request = pool.request();
      request.input('seller_id', sql.Int, seller_id);
      request.input('name', sql.NVarChar, name);
      request.input('description', sql.NVarChar, description);
      request.input('price', sql.Decimal(10, 2), price);
      request.input('image_url', sql.NVarChar, image_url);
      request.input('state', sql.NVarChar, state); // 🐛 SOLUÇÃO: Adiciona o input para 'state'
      request.input('city', sql.NVarChar, city);
      request.input('category_id', sql.Int, category_id);
      request.input('available_quantity', sql.Int, available_quantity);
      request.input('unit_of_measure', sql.NVarChar, unit_of_measure);

      const result = await request.query(
        // 🐛 SOLUÇÃO: Adiciona as novas colunas na query de INSERT
        `INSERT INTO Products (seller_id, name, description, price, image_url, state, city, category_id, available_quantity, unit_of_measure) 
         VALUES (@seller_id, @name, @description, @price, @image_url, @state, @city, @category_id, @available_quantity, @unit_of_measure)`
      );
      return result.rowsAffected[0];
    } catch (err) {
      console.error('Erro ao criar produto:', err.message);
      throw err;
    }
  },
};

module.exports = Product;