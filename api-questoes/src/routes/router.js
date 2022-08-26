const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const questaoController = require('../controllers/QuestoesController');

// router.get('/questoes', questaoController.pesquisarTudo);
router.get('/modoDeJogo/:modo', questaoController.pesquisarModos);
// router.get('/questoes/id/:id', questaoController.pesquisarPorId);
// router.get('/questoes/materia/:materia', questaoController.pesquisarPorMateria);
router.post('/questoes/selecionar',jsonParser,questaoController.selecionarQuestoes);

module.exports = router;