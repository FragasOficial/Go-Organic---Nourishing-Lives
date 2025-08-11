const { sql, poolPromise } = require('../config/db.config');

const User = {
  create: async (user) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('name', sql.NVarChar, user.name)
        .input('email', sql.NVarChar, user.email)
        .input('password', sql.NVarChar, user.password)
        .input('user_type', sql.NVarChar, user.user_type)
        .input('state', sql.NVarChar, user.state)
        .input('city', sql.NVarChar, user.city)
        .input('phone', sql.NVarChar, user.phone)
        .input('business_name', sql.NVarChar, user.business_name)
        .input('cnpj', sql.NVarChar, user.cnpj)
        .input('description', sql.NVarChar, user.description)
        .query(`
          INSERT INTO Users (name, email, password, user_type, state, city, phone, business_name, cnpj, description)
          VALUES (@name, @email, @password, @user_type, @state, @city, @phone, @business_name, @cnpj, @description);
          SELECT SCOPE_IDENTITY() AS id;
        `);
      return result.recordset[0].id;
    } catch (err) {
      throw new Error('Erro ao criar o usuário: ' + err.message);
    }
  },
  
  findByEmail: async (email) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
      return result.recordset[0];
    } catch (err) {
      throw new Error('Erro ao buscar o usuário por email: ' + err.message);
    }
  },

  findById: async (id) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE id = @id');
      return result.recordset[0];
    } catch (err) {
      throw new Error('Erro ao buscar o usuário por ID: ' + err.message);
    }
  }
};

module.exports = User;