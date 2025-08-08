const sql = require('mssql');

const config = {
  user: 'tudoorganico_user',
  password: 'C@twaba2024',
  server: 'localhost\\SQLEXPRESS',
  database: 'GoOrganic',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado ao SQL Server');
    return pool;
  })
  .catch(err => console.log('Erro na conexão:', err));

module.exports = {
  sql, poolPromise
};