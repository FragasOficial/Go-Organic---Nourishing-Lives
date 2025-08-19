// middleware/auth.jwt.js

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// Middleware para verificar token JWT
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

// Middleware para verificar se usuário é vendedor
const isSeller = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    if (user.user_type === "seller" || user.user_type === "vendedor") {
      return next();
    }

    return res.status(403).send({ message: "Acesso negado! Faça login como vendedor." });
  } catch (err) {
    console.error("Erro no middleware isSeller:", err);
    res.status(500).send({ message: err.message });
  }
};

// Middleware para verificar se usuário é admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    if (user.user_type === "admin" || user.user_type === "administrador") {
      return next();
    }

    return res.status(403).send({ message: "Acesso negado! Requer perfil de administrador." });
  } catch (err) {
    console.error("Erro no middleware isAdmin:", err);
    res.status(500).send({ message: err.message });
  }
};

// Middleware para verificar se usuário é moderador
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    if (user.user_type === "moderator" || user.user_type === "moderador") {
      return next();
    }

    return res.status(403).send({ message: "Acesso negado! Requer perfil de moderador." });
  } catch (err) {
    console.error("Erro no middleware isModerator:", err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  verifyToken,
  isSeller,
  isAdmin,
  isModerator
};
