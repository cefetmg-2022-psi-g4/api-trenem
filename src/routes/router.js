const express = require('express');
const router = express.Router();
const controller = require('../controllers/QuestoesController')
router.get('/questoes', controller.pesquisarTudo);
router.get('/modoDeJogo/:modo', controller.pesquisarModos);
router.get('/questoes/id/:id', controller.pesquisarPorId);
router.get('/questoes/materia/:materia', controller.pesquisarPorMateria);
module.exports = router;