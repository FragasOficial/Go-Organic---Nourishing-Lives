const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// Middleware para verificar o token de autenticação
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Token não fornecido!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware para verificar se o usuário é um vendedor
const isVendedor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
    }
    
    if (user.user_type === 'vendedor') {
      next();
      return;
    }
    
    res.status(403).send({ message: "Requer papel de Vendedor!" });
  } catch (err) {
    console.error("Erro no middleware isVendedor:", err);
    res.status(500).send({ message: err.message });
  }
};

// Middleware para verificar se o usuário é um administrador
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
    }
    
    if (user.user_type === 'admin') {
      next();
      return;
    }
    
    res.status(403).send({ message: "Requer papel de Administrador!" });
  } catch (err) {
    console.error("Erro no middleware isAdmin:", err);
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isVendedor,
  isAdmin
};

module.exports = authJwt;