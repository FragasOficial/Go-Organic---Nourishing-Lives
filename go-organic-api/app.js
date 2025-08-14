const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Rotas de autenticação
require('./routes/auth.routes')(app);

// Adicionar as rotas de produtos da mesma forma
require('./routes/product.routes')(app);

// Exportar a aplicação para ser usada pelo server.js
module.exports = app;