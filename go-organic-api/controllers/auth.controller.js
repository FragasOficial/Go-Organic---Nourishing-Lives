const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, user_type, state, city, phone, business_name, cnpj, description } = req.body;
    
    // Verificar se o email já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: "Email já está em uso!" });
    }

    // Criar usuário
    const userId = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      user_type,
      state,
      city,
      phone,
      business_name,
      cnpj,
      description
    });

    res.send({ message: "Usuário registrado com sucesso!", userId });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Senha inválida!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};