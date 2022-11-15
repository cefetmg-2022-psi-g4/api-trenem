const fetch = require('node-fetch');

exports.enviarRankingGeral = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        await fetch("http://localhost:3001/getEstudantes", {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
        })  
        .then((response) => response.json())
        .then((data) => {
            data.sort(function(a,b){
                if(a.percentualDeAcertos == b.percentualDeAcertos){
                  return a.totalAcertos>b.totalAcertos ? -1 : 1;
                }
                return a.percentualDeAcertos > b.percentualDeAcertos ? -1 : 1;
            });
            res.status(200).send(JSON.stringify(data));
        });
    } catch (err){
        res.status(500).send("Não foi possível pegar o ranking geral devido ao erro : "+err);
    }
}

exports.enviarRankingAmigos = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        await fetch("http://localhost:3002/listarAmigos", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        })  
        .then((response) => response.json())
        .then((data) => {
            data.sort(function(a,b){
                if(a.percentualDeAcertos == b.percentualDeAcertos){
                  return a.totalAcertos>b.totalAcertos ? -1 : 1;
                }
                return a.percentualDeAcertos > b.percentualDeAcertos ? -1 : 1;
            });
            res.status(200).send(JSON.stringify(data));
        });
    } catch (err){
        res.status(500).send("Não foi possível pegar o ranking de amigos devido ao erro : "+err);
    }
}