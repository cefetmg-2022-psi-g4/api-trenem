const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlEncoderParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const rankingController = require("../controllers/RankingController")

router.post('/ranking',jsonParser,rankingController.enviarRankingGeral);

module.exports = router;