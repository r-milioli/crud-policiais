const policiaisRepository = require('../repository/policiaisRepository');

const getAllPoliciais = async () => {
    return await policiaisRepository.getAllPoliciais();
};

const createPolicial = async (policialData) => {
    return await policiaisRepository.createPolicial(policialData);
};

const findPolicialByCPF = async (cpf) => {
    return await policiaisRepository.findPolicialByCPF(cpf);
};

module.exports = {
    getAllPoliciais,
    createPolicial,
    findPolicialByCPF
};