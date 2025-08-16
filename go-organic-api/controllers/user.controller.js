const sql = require('mssql');
const config = require('../config/db.config');
const User = require('../models/user.model');

// Função de teste
exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo público.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo de usuário.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo de moderador.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo de administrador.");
};

// Nova função para buscar o perfil do usuário logado
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }
        res.status(200).send(user);
    } catch (err) {
        console.error("Erro ao buscar perfil do usuário:", err);
        res.status(500).send({ message: "Erro ao buscar o perfil do usuário." });
    }
};

// Nova função para buscar os pedidos do usuário logado
exports.getUserOrders = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('userId', sql.Int, req.userId)
            .query('SELECT * FROM Orders WHERE user_id = @userId');
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error("Erro ao buscar pedidos do usuário:", err);
        res.status(500).send({ message: "Erro ao buscar os pedidos." });
    }
};