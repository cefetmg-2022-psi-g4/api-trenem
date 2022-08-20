const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const questaoController = require('../controllers/QuestoesController');
const estudanteController = require('../controllers/EstudanteController');
const amizadeController = require('../controllers/AmizadeController');
router.get('/questoes', questaoController.pesquisarTudo);
router.get('/modoDeJogo/:modo', questaoController.pesquisarModos);
router.get('/questoes/id/:id', questaoController.pesquisarPorId);
router.get('/questoes/materia/:materia', questaoController.pesquisarPorMateria);
router.post('/conta/criarConta', jsonParser, estudanteController.criarConta);
router.post('/conta/acessarConta', jsonParser, estudanteController.acessarConta);
router.post('/buscarNome', jsonParser, estudanteController.buscarNome);
router.post('/verificarEmail', jsonParser, estudanteController.verificarEmail);
router.post('/pedidoDeAmizade',jsonParser, amizadeController.enviarPedidoDeAmizade); 
router.post('/aceitarPedido',jsonParser, amizadeController.aceitarPedido); 
router.post('/recusarPedido',jsonParser, amizadeController.recusarPedido); 
router.post('/removerAmigo',jsonParser, amizadeController.removerAmigo); 
module.exports = router;