const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 14330,   // <-- adiciona aqui
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,         // se não for Azure, pode deixar false
        enableArithAbort: true,
        trustServerCertificate: true  // <-- importante se for local
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
