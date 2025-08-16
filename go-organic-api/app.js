const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Rotas de autenticação
require('./routes/auth.routes')(app);

// Rotas de produtos
require('./routes/product.routes')(app);

// Rotas de administrador
require('./routes/admin.routes')(app);

// Rotas de usuário
require('./routes/user.routes')(app);

module.exports = app;