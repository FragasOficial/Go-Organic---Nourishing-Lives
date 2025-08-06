// src/server.js
require('dotenv').config();
const express = require('express');
const mssql = require('mssql');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Use true para conexão segura (Azure SQL Database)
        trustServerCertificate: true // Use true para certificados auto-assinados
    }
};

// Adicione esta linha para depuração
console.log('Tentando conectar com a seguinte configuração:', config.user, config.server, config.database);

mssql.connect(config, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado com sucesso ao banco de dados SSMS!');
    }
});

mssql.connect(config, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado com sucesso ao banco de dados SSMS!');
    }
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});