const sql = require('mssql');
const config = require('../config/db.config');

// Função para buscar estatísticas do dashboard do admin
exports.getStats = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    
    const usersResult = await pool.request().query('SELECT COUNT(*) AS total FROM Users');
    const clientsResult = await pool.request().query("SELECT COUNT(*) AS total FROM Users WHERE user_type = 'cliente'");
    const sellersResult = await pool.request().query("SELECT COUNT(*) AS total FROM Users WHERE user_type = 'vendedor'");
    const productsResult = await pool.request().query('SELECT COUNT(*) AS total FROM Products');
    const ordersResult = await pool.request().query('SELECT COUNT(*) AS total FROM Orders');
    
    res.status(200).send({
      totalUsers: usersResult.recordset[0].total,
      totalClients: clientsResult.recordset[0].total,
      totalSellers: sellersResult.recordset[0].total,
      totalProducts: productsResult.recordset[0].total,
      totalOrders: ordersResult.recordset[0].total,
    });
  } catch (err) {
    console.error('Erro ao buscar estatísticas do dashboard:', err);
    res.status(500).send({ message: "Erro interno ao buscar estatísticas." });
  }
};

// Função para buscar todos os usuários
exports.findAllUsers = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT id, name, email, user_type FROM Users');
    res.status(200).send(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send({ message: "Erro ao buscar a lista de usuários." });
  }
};

// Função para buscar todos os produtos
exports.findAllProducts = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Products');
    res.status(200).send(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send({ message: "Erro ao buscar a lista de produtos." });
  }
};