// src/controllers/productController.js
const mssql = require('mssql');

exports.getProducts = async (req, res) => {
    const { search, state, city } = req.query;

    try {
        const pool = await mssql.connect();
        let query = `
            SELECT
                p.id,
                p.name AS productName,
                p.description,
                p.price,
                p.image_url,
                u.name AS sellerName,
                p.location_city AS city,
                p.location_state AS state
            FROM Products p
            JOIN Users u ON p.seller_id = u.id
            WHERE 1=1
        `;
        let request = pool.request();

        if (search) {
            query += ' AND p.name LIKE @search';
            request.input('search', mssql.VarChar, `%${search}%`);
        }
        if (state) {
            query += ' AND p.location_state = @state';
            request.input('state', mssql.Char, state);
        }
        if (city) {
            query += ' AND p.location_city LIKE @city';
            request.input('city', mssql.VarChar, `%${city}%`);
        }

        const result = await request.query(query);

        res.json(result.recordset);

    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).send('Erro no servidor.');
    }
};