const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crud_policiais',
    port: process.env.DB_PORT || 3008  // Corrigido: era PORT, agora é DB_PORT
});

db.connect((erro) => {
    if (erro) {
        console.log("❌ Erro ao conectar ao banco de dados: ", erro.message);
    } else {
        console.log('✅ Conexão estabelecida com o banco de dados MySQL');
    }
});

module.exports = db;