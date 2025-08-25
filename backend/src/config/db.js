const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: '../../.env'})


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
});

db.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco de dados: ", erro);
    } else {
        console.log('Conexão estabelecida com o banco de dados MYSQL');
    }
});

module.exports = db;