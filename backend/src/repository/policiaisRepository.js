const db = require('../config/db');
const crypto = require('crypto');

// Chave secreta para criptografia (deve estar no .env)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'minha-chave-secreta-32-caracteres!!';
const IV_LENGTH = 16;

// Função para criptografar
const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

// Função para descriptografar
const decrypt = (text) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = textParts.join(':');
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const getAllPoliciais = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM crud_policiais';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar policiais: ', err);
                reject(err);
            } else {
                // Descriptografa a matrícula de cada policial
                const policiaisDescriptografados = results.map(policial => ({
                    ...policial,
                    matricula: decrypt(policial.matricula)
                }));
                resolve(policiaisDescriptografados);
            }
        });
    });
};

const findPolicialByCPF = (cpf) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM crud_policiais WHERE cpf = ?';
        db.query(sql, [cpf], (err, results) => {
            if (err) {
                console.error('Erro ao buscar policial por CPF: ', err);
                reject(err);
            } else {
                if (results[0]) {
                    results[0].matricula = decrypt(results[0].matricula);
                }
                resolve(results[0] || null);
            }
        });
    });
};

const findPolicialByRGCivil = (rgCivil) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM crud_policiais WHERE rg_civil = ?';
        db.query(sql, [rgCivil], (err, results) => {
            if (err) {
                console.error('Erro ao buscar policial por RG Civil: ', err);
                reject(err);
            } else {
                if (results[0]) {
                    results[0].matricula = decrypt(results[0].matricula);
                }
                resolve(results[0] || null);
            }
        });
    });
};

const findPolicialByRGMilitar = (rgMilitar) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM crud_policiais WHERE rg_militar = ?';
        db.query(sql, [rgMilitar], (err, results) => {
            if (err) {
                console.error('Erro ao buscar policial por RG Militar: ', err);
                reject(err);
            } else {
                if (results[0]) {
                    results[0].matricula = decrypt(results[0].matricula);
                }
                resolve(results[0] || null);
            }
        });
    });
};

const createPolicial = (policial) => {
    return new Promise((resolve, reject) => {
        // Criptografa a matrícula antes de salvar
        const matriculaCriptografada = encrypt(policial.matricula);
        
        const sql = 'INSERT INTO crud_policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [policial.rg_civil, policial.rg_militar, policial.cpf, policial.data_nascimento, matriculaCriptografada], (err, results) => {
            if (err) {
                console.error('Erro ao criar policial: ', err);
                reject(err);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

module.exports = {
    getAllPoliciais,
    findPolicialByCPF,
    findPolicialByRGCivil,
    findPolicialByRGMilitar,
    createPolicial
};