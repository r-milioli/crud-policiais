const db = require('../config/db');

const getAllPoliciais = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM crud_policiais';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar policiais: ', err);
                reject(err);
            } else {
                resolve(results);
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
                resolve(results[0] || null);
            }
        });
    });
};

const createPolicial = (policial) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO crud_policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [policial.rg_civil, policial.rg_militar, policial.cpf, policial.data_nascimento, policial.matricula], (err, results) => {
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