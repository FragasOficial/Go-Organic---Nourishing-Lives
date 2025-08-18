// middleware/auth.jwt.js

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// Middleware to check authentication token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware to check if user is a seller
const isSeller = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.user_type === "seller") {
      return next();
    }

    return res.status(403).send({ message: "Require Seller role!" });
  } catch (err) {
    console.error("Error in isSeller middleware:", err);
    res.status(500).send({ message: err.message });
  }
};

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.user_type === "admin") {
      return next();
    }

    return res.status(403).send({ message: "Require Admin role!" });
  } catch (err) {
    console.error("Error in isAdmin middleware:", err);
    res.status(500).send({ message: err.message });
  }
};

// Middleware to check if user is a moderator
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.user_type === "moderator") {
      return next();
    }

    return res.status(403).send({ message: "Require Moderator role!" });
  } catch (err) {
    console.error("Error in isModerator middleware:", err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  verifyToken,
  isSeller,
  isAdmin,
  isModerator
};
