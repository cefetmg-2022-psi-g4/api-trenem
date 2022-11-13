const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const rankingController = require("../controllers/RankingController")

router.get('/ranking',jsonParser,rankingController.enviarRankingGeral);
router.post('/rankingDeAmigos',jsonParser,rankingController.enviarRankingAmigos);

module.exports = router;