const express = require('express');
const cors = require('cors');
const policiaisRoutes = require('./routes/policiaisRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/policiais', policiaisRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API CRUD Policiais funcionando!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;