const EstudanteModel = require("../models/EstudanteModel");

exports.criarConta = async (req,res,next) => {
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const senha =  req.body.senha;
        const estudante = await EstudanteModel.create({nome: nome, email:email, senha:senha, cod: 0, foto: null, percentualDeAcertos: 0, tempoMedio: 0});
        res.status(200).send("Conta criada com sucesso!");
    }
    catch(err){
        res.status(500).send(JSON.stringify(err));
    }
    
}

exports.acessarConta = async (req,res,next) => {
    try{
        const email = req.body.email;
        const senha = req.body.senha;
        
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível acessar a conta devido: " + err));
    }   
}

exports.verificarEmail = async (req,res,next) => {
    try{
        const email = req.body.email;

        const existenciaEmail = await EstudanteModel.findByPk(email);
    
        if(existenciaEmail === null)
            res.status(200).send("Email válido!");
        
        res.status(200).send("Email já cadastrado!");
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível pesquisar o email, devido: " + err));
    }
}