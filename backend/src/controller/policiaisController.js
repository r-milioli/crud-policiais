const policiaisRepository = require('../repository/policiaisRepository');

// Buscar todos os policiais
const getAllPoliciais = async (req, res) => {
    try {
        const policiais = await policiaisRepository.getAllPoliciais();
        res.json(policiais);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar policiais' });
    }
};

// Buscar policial por CPF
const getPolicialByCPF = async (req, res) => {
    try {
        const { cpf } = req.params;
        const policial = await policiaisRepository.findPolicialByCPF(cpf);
        
        if (!policial) {
            return res.status(404).json({ error: 'Policial não encontrado' });
        }
        
        res.json(policial);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar policial' });
    }
};

// Buscar policial por RG Civil
const getPolicialByRGCivil = async (req, res) => {
    try {
        const { rgCivil } = req.params;
        const policial = await policiaisRepository.findPolicialByRGCivil(rgCivil);
        
        if (!policial) {
            return res.status(404).json({ error: 'Policial não encontrado' });
        }
        
        res.json(policial);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar policial' });
    }
};

// Buscar policial por RG Militar
const getPolicialByRGMilitar = async (req, res) => {
    try {
        const { rgMilitar } = req.params;
        const policial = await policiaisRepository.findPolicialByRGMilitar(rgMilitar);
        
        if (!policial) {
            return res.status(404).json({ error: 'Policial não encontrado' });
        }
        
        res.json(policial);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar policial' });
    }
};

// Criar novo policial
const createPolicial = async (req, res) => {
    try {
        const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;
        
        // Validação básica
        if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const id = await policiaisRepository.createPolicial(req.body);
        
        if (id) {
            res.status(201).json({ id, ...req.body });
        } else {
            res.status(500).json({ error: 'Erro ao criar policial' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar policial' });
    }
};

module.exports = {
    getAllPoliciais,
    getPolicialByCPF,
    getPolicialByRGCivil,
    getPolicialByRGMilitar,
    createPolicial
};