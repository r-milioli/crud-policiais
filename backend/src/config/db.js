const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    port: process.env.DB_PORT 
});

db.connect((erro) => {
    if (erro) {
        console.log("❌ Erro ao conectar ao banco de dados: ", erro.message);
    } else {
        console.log('✅ Conexão estabelecida com o banco de dados MySQL');
    }
});

module.exports = db;