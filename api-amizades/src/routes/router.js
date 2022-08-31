const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();

const amizadeController = require('../controllers/AmizadeController');

router.post('/pedidoDeAmizade',jsonParser, amizadeController.enviarPedidoDeAmizade); 
router.post('/aceitarPedido',jsonParser, amizadeController.aceitarPedido); 
router.post('/recusarPedido',jsonParser, amizadeController.recusarPedido); 
router.post('/removerAmigo',jsonParser, amizadeController.removerAmigo); 


module.exports = router;