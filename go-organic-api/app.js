const express = require("express");
const cors = require("cors");

const app = express();

// Configuração do CORS para permitir requisições de qualquer origem
// Esta é uma boa prática para ambiente de desenvolvimento.
// Você pode substituir por `origin: "http://127.0.0.1:5501"` se quiser ser mais específico.
var corsOptions = {
  origin: "*"
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