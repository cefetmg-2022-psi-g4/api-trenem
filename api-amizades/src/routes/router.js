const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const Auth = require("../middlewares/Auth");

const amizadeController = require('../controllers/AmizadeController');

router.post('/pedidoDeAmizade', Auth, jsonParser, amizadeController.enviarPedidoDeAmizade); 
router.post('/aceitarPedido', Auth, jsonParser, amizadeController.aceitarPedido); 
router.post('/recusarPedido', Auth, jsonParser, amizadeController.recusarPedido); 
router.post('/removerAmigo', Auth, jsonParser, amizadeController.removerAmigo); 
router.post('/listarAmigos', jsonParser, amizadeController.listarAmigos); 

module.exports = router;