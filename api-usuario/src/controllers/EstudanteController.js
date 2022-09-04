const EstudanteModel = require("../models/EstudanteModel");
const Encriptacao = require("../services/encriptacao");
const sequelize = require("../services/db");
const Auth = require("../services/auth");

exports.criarConta = async (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const senha =  req.body.senha;
        const hashSenha = await  Encriptacao.gerarHash(senha);
        // const count = await EstudanteModel.destroy({where: { cod: 1 }});        
        const codEstudante = await EstudanteModel.count();
        const estudante = await EstudanteModel.create({nome: nome, email:email, senha:hashSenha, cod: codEstudante, foto: null, percentualDeAcertos: 0, tempoMedio: 0});
        
        estudante.token = Auth.gerarToken(email);

        res.status(200).send(JSON.stringify({estudante, token: estudante.token}));
    }
    catch(err){
        res.status(500).send(JSON.stringify("erro ao criar conta: " + err));
    }  
}

exports.buscarNome = async (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const nome = req.body.nome;
        const results = await sequelize.query("SELECT * FROM estudante e WHERE e.nome LIKE '%" + nome + "%' AND e.cod <> " + cod);
        res.status(200).send(JSON.stringify(results));
    }
    catch(err){
        res.status(500).send(JSON.stringify("erro ao buscar nome: " + err));
    }
}

exports.acessarConta = async (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
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
            else{
                conta.token = await Auth.gerarToken(conta);

                res.status(200).send(JSON.stringify(conta));
            }
        }
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível acessar a conta devido: " + err));
    }   
}

exports.verificarToken = async (req,res,next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token enviado.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

exports.verificarEmail = async (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
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

exports.alterarDados = async(req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
    try{
        const email = req.body.email;
        const nome = req.body.nome;
        const senha = req.body.senha;
        const foto = req.body.foto;
        const conta = await EstudanteModel.findByPk(email);
        if(conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else{
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if(!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else{
                await EstudanteModel.update({nome : nome, foto : foto},
                    {
                        where: {
                            email : email
                        }
                    });
                res.status(200).send("Alterado com sucesso!");
            }       
        }
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível alterar os dados, devido: " + err));
    }
}

exports.alterarDados = async(req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
    try{
        const email = req.body.email;
        const nome = req.body.nome;
        const senha = req.body.senha;
        const foto = req.body.foto;
        const conta = await EstudanteModel.findByPk(email);
        if(conta == null)
            res.status(500).send(JSON.stringify("Não existe nenhuma conta associada à este email!"));
        else{
            const senhaCorreta = await Encriptacao.compararHash(senha, conta.senha);
            if(!senhaCorreta)
                res.status(500).send(JSON.stringify("Senha incorreta!"));
            else{
                await EstudanteModel.update({nome : nome, foto : foto},
                    {
                        where: {
                            email : email
                        }
                    });
                res.status(200).send("Alterado com sucesso!");
            }       
        }
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível alterar os dados, devido: " + err));
    }
}

exports.alterarSenha = async(req,res,next) => {
    res.header("Acess-Control-Allow-Origin","*");
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
            else{
                const novaSenha = await Encriptacao.gerarHash(req.body.novaSenha);
                await EstudanteModel.update({senha : novaSenha},
                    {
                        where: {
                            email : email
                        }
                    });
                res.status(200).send("Alterada com sucesso!");
            }       
        }
    }
    catch(err){
        res.status(500).send(JSON.stringify("Não foi possível alterar a senha, devido: " + err));
    }
}