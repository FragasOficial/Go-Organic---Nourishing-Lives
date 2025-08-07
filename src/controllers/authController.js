// src/controllers/authController.js
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, city, state, user_type, whatsapp, address } = req.body;

    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ message: 'Dados de registro incompletos.' });
    }

    try {
        const pool = await mssql.connect();

        const userExistsResult = await pool.request()
            .input('email', mssql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (userExistsResult.recordset.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.request()
            .input('name', mssql.VarChar, name)
            .input('email', mssql.VarChar, email)
            .input('whatsapp', mssql.VarChar, whatsapp)
            .input('password', mssql.VarChar, hashedPassword)
            .input('address', mssql.VarChar, address)
            .input('city', mssql.VarChar, city)
            .input('state', mssql.Char, state)
            .input('user_type', mssql.VarChar, user_type)
            .query(`
                INSERT INTO Users (name, email, whatsapp, password, address, city, state, user_type)
                VALUES (@name, @email, @whatsapp, @password, @address, @city, @state, @user_type)
            `);

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            user: { name, email, user_type, city, state }
        });

    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await mssql.connect();

        const result = await pool.request()
            .input('email', mssql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(400).json({ message: 'Email ou senha inválidos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou senha inválidos.' });
        }

        const payload = {
            userId: user.id,
            userType: user.user_type
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            userType: user.user_type,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.user_type
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};