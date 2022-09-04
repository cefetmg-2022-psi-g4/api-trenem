const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const estudanteController = require('../controllers/EstudanteController');
const Auth = require("../middlewares/Auth");

router.use(Auth);

router.post('/conta/criarConta', jsonParser, estudanteController.criarConta);
router.post('/conta/acessarConta', jsonParser, estudanteController.acessarConta);
router.post('/buscarNome', jsonParser, estudanteController.buscarNome);
router.post('/verificarEmail', jsonParser, estudanteController.verificarEmail);
router.post('/alterarDados', jsonParser, estudanteController.alterarDados);
router.post('/alterarSenha', jsonParser, estudanteController.alterarSenha);

module.exports = router;