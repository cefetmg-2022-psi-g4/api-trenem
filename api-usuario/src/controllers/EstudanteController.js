const EstudanteModel = require("../models/EstudanteModel");
const RealizadasModel = require("../../../api-questoes/src/models/RealizadasModel.js");
const Encriptacao = require("../services/encriptacao");
const sequelize = require("../services/db");
const Auth = require("../services/auth");

exports.criarConta = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const hashSenha = await Encriptacao.gerarHash(senha);
        // const count = await EstudanteModel.destroy({where: { cod: 1 }});        
        const codEstudante = await EstudanteModel.count();
        const estudante = await EstudanteModel.create({ nome: nome, email: email, senha: hashSenha, cod: codEstudante, foto: null, percentualDeAcertos: 0, tempoMedio: 0 });

        const token = Auth.gerarToken(email);

        res.status(200).send(JSON.stringify(token));
    }
    catch (err) {
        res.status(500).send(JSON.stringify("erro ao criar conta: " + err));
    }
}

exports.buscarNome = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const nome = req.body.nome;
        const results = await sequelize.query("SELECT * FROM estudante e WHERE e.nome LIKE '%" + nome + "%' AND e.cod <> " + cod);
        res.status(200).send(JSON.stringify(results));
    }
    catch (err) {
        res.status(500).send(JSON.stringify("erro ao buscar nome: " + err));
    }
}

exports.getCod = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const email = req.email;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este token!"));
        else {
            res.status(200).send(JSON.stringify(conta.cod));
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível acessar a conta devido: " + err));
    }
}

exports.acessarConta = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const email = req.body.email;
        const senha = req.body.senha;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else {
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if (!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else {
                const token = Auth.gerarToken(conta.email);

                res.status(200).send(JSON.stringify(token));
            }
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível acessar a conta devido: " + err));
    }
}

exports.autenticar = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const email = req.email;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este token!"));
        else {
            res.status(200).send(JSON.stringify("Autenticado."));
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível acessar a conta devido: " + err));
    }
}

exports.verificarEmail = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const email = req.body.email;

        const existenciaEmail = await EstudanteModel.findByPk(email);

        if (existenciaEmail === null)
            res.status(200).send("Email válido!");
        else
            res.status(200).send("Email já cadastrado!");
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível pesquisar o email, devido: " + err));
    }
}

exports.alterarDados = async (req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    try {
        const email = req.body.email;
        const nome = req.body.nome;
        const senha = req.body.senha;
        const foto = req.body.foto;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else {
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if (!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else {
                await EstudanteModel.update({ nome: nome, foto: foto },
                    {
                        where: {
                            email: email
                        }
                    });
                res.status(200).send("Alterado com sucesso!");
            }
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível alterar os dados, devido: " + err));
    }
}

exports.alterarDados = async (req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    try {
        const email = req.body.email;
        const nome = req.body.nome;
        const senha = req.body.senha;
        const foto = req.body.foto;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else {
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if (!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else {
                await EstudanteModel.update({ nome: nome, foto: foto },
                    {
                        where: {
                            email: email
                        }
                    });
                res.status(200).send("Alterado com sucesso!");
            }
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível alterar os dados, devido: " + err));
    }
}

exports.alterarSenha = async (req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    try {
        const email = req.body.email;
        const senha = req.body.senha;
        const conta = await EstudanteModel.findByPk(email);
        if (conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else {
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if (!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else {
                const novaSenha = await Encriptacao.gerarHash(req.body.novaSenha);
                await EstudanteModel.update({ senha: novaSenha },
                    {
                        where: {
                            email: email
                        }
                    });
                res.status(200).send("Alterada com sucesso!");
            }
        }
    }
    catch (err) {
        res.status(500).send(JSON.stringify("Não foi possível alterar a senha, devido: " + err));
    }
}


// Em construção
// exports.processarProva = async (req, res, next) => {
//     res.header("Acess-Control-Allow-Origin", "*");
//     try{
//         const questoes = req.body.questoes;//vetor de objetos: {id:int, alternativa:char, gabarito:char}
//         //caso o usuario nao fez a questao, alternativa = null
//         let pontuacaoTotal = 0, numQuestoes = questoes.length;
//         for(questao in questoes){
//             if(questao.alternativa==questao.gabarito)pontuacaoTotal++;
//             RealizadasModel.create({codEstudante: cod, idQuestao: idQuestao, alternativaMarcada: alternativas})
//         }
//         const idEstudante = req.body.id;

//     }
//     catch (err) {

//     }
// }