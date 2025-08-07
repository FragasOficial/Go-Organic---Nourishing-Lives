// ==== AJUSTES NO server.js PARA UNIFICAR FRONT + BACKEND ====
const express = require('express');
const mssql = require('mssql');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Config MSSQL
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true'
    }
};

// Middlewares
app.use(express.json());

// Servir arquivos estaticamente
app.use(express.static(path.join(__dirname, 'public')));

// Rotas API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// SPA: redireciona tudo pro index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conectar banco
mssql.connect(sqlConfig)
    .then(pool => {
        console.log('Conectado ao SQL Server.');
        app.locals.db = pool;
        app.listen(port, () => console.log(`Servidor http://localhost:${port}`));
    })
    .catch(err => console.error('Erro ao conectar DB:', err));
