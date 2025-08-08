const { poolPromise } = require('../config/db.config');
const sql = require('mssql');

exports.getStats = async (req, res) => {
  try {
    const pool = await poolPromise;
    
    // Total de usuários
    const usersResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Users');
    
    // Total de clientes
    const clientsResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Users WHERE user_type = \'client\'');
    
    // Total de vendedores
    const sellersResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Users WHERE user_type = \'seller\'');
    
    // Total de administradores
    const adminsResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Users WHERE user_type = \'admin\'');
    
    // Total de produtos
    const productsResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Products');
    
    // Total de pedidos
    const ordersResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Orders');
    
    // Total de vendas
    const salesResult = await pool.request()
      .query('SELECT SUM(total) AS total FROM Orders WHERE status = \'completed\'');
    
    // Vendas por mês
    const salesByMonthResult = await pool.request()
      .query(`SELECT 
                FORMAT(created_at, 'yyyy-MM') AS month, 
                SUM(total) AS total 
              FROM Orders 
              WHERE status = 'completed'
              GROUP BY FORMAT(created_at, 'yyyy-MM')
              ORDER BY month`);
    
    res.status(200).send({
      totalUsers: usersResult.recordset[0].total,
      totalClients: clientsResult.recordset[0].total,
      totalSellers: sellersResult.recordset[0].total,
      totalAdmins: adminsResult.recordset[0].total,
      totalProducts: productsResult.recordset[0].total,
      totalOrders: ordersResult.recordset[0].total,
      totalSales: salesResult.recordset[0].total || 0,
      salesByMonth: salesByMonthResult.recordset
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};