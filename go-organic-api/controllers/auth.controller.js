// controllers/auth.controller.js

const db = require("../models");
const config = require("../config/auth.config");
const User = db.User; // ✅ corrigido

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign Up
exports.signup = async (req, res) => {
  try {
    const { username, email, password, user_type } = req.body;

    if (!username || !email || !password || !user_type) {
      return res.status(400).send({ message: "Preencha todos os campos obrigatórios." });
    }

    // Normaliza o tipo de usuário
    const normalizedType = user_type.toLowerCase();

    // Tipos aceitos
    const validTypes = ["cliente", "vendedor", "administrador", "moderador"];

    if (!validTypes.includes(normalizedType)) {
      return res.status(400).send({
        message: `Tipo de usuário inválido. Valores aceitos: ${validTypes.join(", ")}.`
      });
    }

    // Cria usuário
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      user_type: normalizedType
    });

    res.send({ message: "Usuário registrado com sucesso!", user });
  } catch (err) {
    console.error("Erro no signup:", err);
    res.status(500).send({ message: err.message });
  }
};

// Sign In
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Preencha email e senha." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Senha inválida!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24h
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      user_type: user.user_type,
      accessToken: token
    });
  } catch (err) {
    console.error("Erro no signin:", err);
    res.status(500).send({ message: err.message });
  }
};
