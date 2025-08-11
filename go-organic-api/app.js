const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.get("/", (req, res) => {
  res.json({ message: "API GoOrganic - By Francisco Costa" });
});

// Importar rotas de autenticação, passando o objeto 'app'
require("./routes/auth.routes")(app);

module.exports = app;