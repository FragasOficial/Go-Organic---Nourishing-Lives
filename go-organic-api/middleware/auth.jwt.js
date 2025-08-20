const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  // 🔥 Se não veio em x-access-token, tenta no Authorization: Bearer ...
  if (!token && req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length); // remove "Bearer "
    }
  }

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

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.user_type === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Requer perfil de Admin!" });
  });
};

isSeller = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.user_type === "vendedor") {
      next();
      return;
    }
    res.status(403).send({ message: "Requer perfil de Vendedor!" });
  });
};

isAdminOrSeller = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.user_type === "admin" || user.user_type === "vendedor") {
      next();
      return;
    }
    res.status(403).send({ message: "Requer Admin ou Vendedor!" });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSeller,
  isAdminOrSeller
};

module.exports = authJwt;
