const bodyParser = require("body-parser");

module.exports = (app, sequelize) => {
  // permite receber JSON no body
  app.use(bodyParser.json());

  // endpoint básico para ver se a API responde
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "API está rodando 🚀" });
  });

  // endpoint para testar conexão com o banco
  app.get("/db-test", async (req, res) => {
    try {
      const [results] = await sequelize.query("SELECT 1+1 AS result");
      res.json({ status: "ok", dbResult: results[0].result });
    } catch (error) {
      console.error("Erro ao testar DB:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // endpoint para listar todas as tabelas do banco
  app.get("/db-tables", async (req, res) => {
    try {
      const [tables] = await sequelize.query(`
        SELECT TABLE_SCHEMA, TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_SCHEMA, TABLE_NAME;
      `);
      res.json({ status: "ok", tables });
    } catch (error) {
      console.error("Erro ao listar tabelas:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // endpoint para listar colunas de uma tabela
  app.get("/db-columns/:table", async (req, res) => {
    const table = req.params.table;
    try {
      const [columns] = await sequelize.query(`
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${table}'
        ORDER BY ORDINAL_POSITION;
      `);
      res.json({ status: "ok", table, columns });
    } catch (error) {
      console.error("Erro ao listar colunas:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // endpoint para trazer os primeiros registros de uma tabela
  app.get("/db-data/:table", async (req, res) => {
    const table = req.params.table;
    try {
      const [rows] = await sequelize.query(`
        SELECT TOP 10 * 
        FROM [${table}]
      `);
      res.json({ status: "ok", table, rows });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // endpoint SEGURO para rodar queries SQL dinâmicas
  app.post("/db-query", async (req, res) => {
    const apiKey = req.headers["x-api-key"];
    const expectedKey = process.env.API_KEY || "supersecreta123"; // defina no .env

    if (apiKey !== expectedKey) {
      return res.status(403).json({ status: "error", message: "Acesso negado. API key inválida." });
    }

    const { sql } = req.body;
    if (!sql) {
      return res.status(400).json({ status: "error", message: "SQL é obrigatório" });
    }

    try {
      const [results] = await sequelize.query(sql);
      res.json({ status: "ok", results });
    } catch (error) {
      console.error("Erro ao executar query:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });
};
