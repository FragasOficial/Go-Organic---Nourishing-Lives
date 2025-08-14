const app = require('./app');
const sql = require('mssql');
const config = require('./config/db.config');
const PORT = process.env.PORT || 3000;

// Função para testar a conexão com o banco de dados
const testDbConnection = async () => {
    try {
        await sql.connect(config);
        console.log('Conexão com o banco de dados SQL Server estabelecida com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar-se ao banco de dados:', err);
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    testDbConnection(); // Executa o teste de conexão
});