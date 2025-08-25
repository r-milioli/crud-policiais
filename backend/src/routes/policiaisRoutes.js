const express = require('express');
const router = express.Router();
const policiaisController = require('../controller/policiaisController');

// POST /policiais - Cadastrar policial
router.post('/', policiaisController.createPolicial);

// GET /policiais - Listar todos os policiais (com filtros opcionais)
router.get('/', policiaisController.getAllPoliciais);

module.exports = router;