// src/controllers/authController.js
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, address, city, state, user_type } = req.body;

    // Validação básica
    if (!name || !email || !password || !user_type) {
        return res.status(400).send('Dados de registro incompletos.');
    }

    try {
        const pool = await mssql.connect();
        
        // Verificar se o usuário já existe
        const userExistsResult = await pool.request()
            .input('email', mssql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (userExistsResult.recordset.length > 0) {
            return res.status(409).send('Email já cadastrado.');
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Inserir novo usuário
        const result = await pool.request()
            .input('name', mssql.VarChar, name)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedPassword)
            .input('address', mssql.VarChar, address)
            .input('city', mssql.VarChar, city)
            .input('state', mssql.Char, state)
            .input('user_type', mssql.VarChar, user_type)
            .query('INSERT INTO Users (name, email, password, address, city, state, user_type) VALUES (@name, @email, @password, @address, @city, @state, @user_type)');

        res.status(201).send('Usuário cadastrado com sucesso!');

    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).send('Erro no servidor.');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await mssql.connect();
        
        // Buscar usuário pelo email
        const result = await pool.request()
            .input('email', mssql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(400).send('Email ou senha inválidos.');
        }

        // Comparar a senha fornecida com a senha criptografada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Email ou senha inválidos.');
        }

        // Gerar e assinar o token JWT
        const payload = {
            userId: user.id,
            userType: user.user_type
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userType: user.user_type });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).send('Erro no servidor.');
    }
};