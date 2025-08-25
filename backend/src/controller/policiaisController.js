const policiaisRepository = require('../repository/policiaisRepository');

// POST /policiais - Criar novo policial
const createPolicial = async (req, res) => {
    try {
        const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;
        
        // Validação de campos obrigatórios
        if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios' 
            });
        }

        const id = await policiaisRepository.createPolicial(req.body);
        
        if (id) {
            res.status(201).json({ 
                message: 'Policial criado com sucesso',
                id, 
                ...req.body 
            });
        } else {
            res.status(500).json({ error: 'Erro ao criar policial' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// GET /policiais - Listar todos os policiais
const getAllPoliciais = async (req, res) => {
    try {
        const { cpf, rg } = req.query; // Filtros opcionais
        
        let policiais;
        if (cpf) {
            policiais = await policiaisRepository.findPolicialByCPF(cpf);
            policiais = policiais ? [policiais] : [];
        } else if (rg) {
            // Tenta buscar por RG Civil primeiro, depois RG Militar
            policiais = await policiaisRepository.findPolicialByRGCivil(rg);
            if (!policiais) {
                policiais = await policiaisRepository.findPolicialByRGMilitar(rg);
            }
            policiais = policiais ? [policiais] : [];
        } else {
            policiais = await policiaisRepository.getAllPoliciais();
        }
        
        res.json(policiais);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar policiais' });
    }
};

module.exports = {
    getAllPoliciais,
    createPolicial
};