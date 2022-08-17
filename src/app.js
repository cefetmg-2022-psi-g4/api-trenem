const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const rotas = require('./routes/router');
app.use('/', rotas);

module.exports = app;