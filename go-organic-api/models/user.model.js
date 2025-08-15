const sql = require('mssql');
const config = require('../config/db.config');

const User = {
    findByEmail: async (email) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Users WHERE email = @email');
            return result.recordset[0];
        } catch (err) {
            console.error('Erro em findByEmail:', err.message);
            throw err;
        }
    },

    findById: async (id) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Users WHERE id = @id');
            return result.recordset[0];
        } catch (err) {
            console.error('Erro em findById:', err.message);
            throw err;
        }
    },

    create: async (userData) => {
        try {
            const pool = await sql.connect(config);
            const { name, email, password, user_type, state, city, phone, business_name, cnpj, description } = userData;

            const request = pool.request();
            request.input('name', sql.NVarChar, name);
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            request.input('user_type', sql.NVarChar, user_type);
            request.input('state', sql.NVarChar, state || null);
            request.input('city', sql.NVarChar, city || null);
            request.input('phone', sql.NVarChar, phone || null);
            request.input('business_name', sql.NVarChar, business_name || null);
            request.input('cnpj', sql.NVarChar, cnpj || null);
            request.input('description', sql.NVarChar, description || null);

            const result = await request.query(
                `INSERT INTO Users (name, email, password, user_type, state, city, phone, business_name, cnpj, description)
                 VALUES (@name, @email, @password, @user_type, @state, @city, @phone, @business_name, @cnpj, @description)`
            );
            return result.rowsAffected[0];
        } catch (err) {
            console.error('Erro ao criar usuário:', err.message);
            throw err;
        }
    }
};

module.exports = User;