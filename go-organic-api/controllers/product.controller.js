const Product = require('../models/product.model');
const User = require('../models/user.model'); 
const sql = require('mssql');
const config = require('../config/db.config'); 

// Função para buscar todos os produtos
exports.findAllProducts = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM dbo.Products');
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os produtos." });
    }
};

// Função para criar produtos
exports.createProduct = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send({ message: "É necessário estar autenticado para cadastrar um produto." });
        }

        const seller_id = req.userId;

        const { name, description, price, image, city, category_id, available_quantity, unit_of_measure } = req.body;

        const pool = await sql.connect(config);
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Decimal(10, 2), price)
            .input('seller_id', sql.Int, seller_id)
            .input('state', sql.NVarChar, 'SP') // O estado pode ser obtido do token do usuário se necessário
            .input('city', sql.NVarChar, city)
            .input('image_url', sql.NVarChar, image)
            .input('category_id', sql.Int, category_id)
            .input('available_quantity', sql.Int, available_quantity)
            .input('unit_of_measure', sql.NVarChar, unit_of_measure)
            .query(`INSERT INTO dbo.Products (name, description, price, seller_id, state, city, image_url, category_id, available_quantity, unit_of_measure)
                    VALUES (@name, @description, @price, @seller_id, @state, @city, @image_url, @category_id, @available_quantity, @unit_of_measure)`);
        
        res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao criar produto:", err);
        res.status(500).send({ message: err.message });
    }
};