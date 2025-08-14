const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const User = require('../models/user.model');

// Cadastro
exports.signup = async (req, res) => {
    try {
        const { name, email, password, user_type, state, city, phone, business_name, cnpj, description } = req.body;
        console.log('Dados recebidos para cadastro:', req.body); // Adicionado para depuração

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
        console.error('Erro no signup:', err.message); // Adicionado para depuração
        res.status(500).send({ message: err.message });
    }
};

// Login
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
        console.error('Erro no signin:', err.message); // Adicionado para depuração
        res.status(500).send({ message: err.message });
    }
};