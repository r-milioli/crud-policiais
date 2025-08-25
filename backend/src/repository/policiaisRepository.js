const db = require('../config/db');
const crypto = require('crypto');

// Chave de criptografia (32 caracteres)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'minha-chave-secreta-32-caracteres!!';
const ALGORITHM = 'aes-256-cbc';

// Função para criptografar
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

// Função para descriptografar
const decrypt = (text) => {
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = textParts.join(':');
        const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        // Se não conseguir descriptografar, retorna o texto original
        return text;
    }
};

const getAllPoliciais = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM policiais';
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
        const sql = 'SELECT * FROM policiais WHERE cpf = ?';
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
        const sql = 'SELECT * FROM policiais WHERE rg_civil = ?';
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
        const sql = 'SELECT * FROM policiais WHERE rg_militar = ?';
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
        
        const sql = 'INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)';
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