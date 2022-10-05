const fetch = require('node-fetch');

const EstudanteModel = require("../models/EstudanteModel");

exports.enviarRankingGeral = async (req, res, next) => {
    try {
        let objeto = {"email":"guima@gmail.com"};
        await fetch("http://localhost:3001/getCod", {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto),
        })  
        .then((response) => response.json())
        .then((data) => res.status(200).send(JSON.stringify(data)));

    } catch (err){
        console.log("erro: "+err);
    }
}

exports.enviarRankingAmigos = async (req, res, next) => {
    try {

    } catch (err){

    }
}