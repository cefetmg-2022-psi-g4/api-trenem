const EstudanteModel = require("../models/EstudanteModel");
const Encriptacao = require("../services/encriptacao");

exports.criarConta = async (req,res,next) => {
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const senha =  req.body.senha;
        const hashSenha = await Encriptacao.gerarHash(senha);
        // const count = await EstudanteModel.destroy({where: { cod: 1 }});        
        const codEstudante = await EstudanteModel.count();
        const estudante = await EstudanteModel.create({nome: nome, email:email, senha:hashSenha, cod: codEstudante, foto: null, percentualDeAcertos: 0, tempoMedio: 0});
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
        const conta = await EstudanteModel.findByPk(email);
        if(conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else{
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if(!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else
                res.status(200).send(JSON.stringify("Usuário logado com sucesso!"))
        }
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
        else
        res.status(200).send("Email já cadastrado!");
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível pesquisar o email, devido: " + err));
    }
}