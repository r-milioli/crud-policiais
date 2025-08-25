const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getAllPoliciais = () => {
    const sql = 'SELECT * FROM crud_policiais';
    return db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar policiais: ', err);
            return [];
        }
        return results;
    });
};

const findPolicialByCPF = (cpf) => {
    const sql = 'SELECT * FROM crud_policiais WHERE cpf = ?';
    return db.query(sql, [cpf], (err, results) => {
        if (err) {
            console.error('Erro ao buscar policial por CPF: ', err);
            return null;
        }
        return results[0];
    });
};


const findPolicialByRGCivil = (rgCivil) => {
    const sql = 'SELECT * FROM crud_policiais WHERE rg_civil = ?';
    return db.query(sql, [rgCivil], (err, results) => {
        if (err) {
            console.error('Erro ao buscar policial por RG Civil: ', err);
            return null;
        }
        return results[0];
    });
};


const findPolicialByRGMilitar = (rgMilitar) => {
    const sql = 'SELECT * FROM crud_policiais WHERE rg_militar = ?';
    return db.query(sql, [rgMilitar], (err, results) => {
        if (err) {
            console.error('Erro ao buscar policial por RG Militar: ', err);
            return null;
        }
        return results[0];
    });
};

const createPolicial = (policial) => {
    
    const saltRounds = 10;
    const matriculaCriptografada = bcrypt.hashSync(policial.matricula, saltRounds);
    
    const sql = 'INSERT INTO crud_policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)';
    return db.query(sql, [policial.rg_civil, policial.rg_militar, policial.cpf, policial.data_nascimento, matriculaCriptografada], (err, results) => {
        if (err) {
            console.error('Erro ao criar policial: ', err);
            return null;
        }
        return results.insertId;
    });
};



module.exports = {
    getAllPoliciais,
    findPolicialByCPF,
    findPolicialByRGCivil,
    findPolicialByRGMilitar,
    createPolicial
    
};