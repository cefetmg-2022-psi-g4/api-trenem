const PedidoModel = require("../models/PedidoModel");
const AmizadeModel = require("../models/AmizadeModel");
const EstudanteModel = require("../models/EstudanteModel");

exports.enviarPedidoDeAmizade = async (req,res,next) => { 
    try{
        const email = req.body.email;
        const cod = req.body.cod;
        const codDestinatario = await EstudanteModel.findByPk(email);
        const pedidoExiste = await PedidoModel.findOne({
            where: {
                codUsuario: cod,
                codDestinatario: codDestinatario.cod,
            }            
        });

        if(pedidoExiste == null){
            const pedido = await PedidoModel.create({codUsuario : cod, codDestinatario : codDestinatario.cod });
            res.status(200).send(JSON.stringify("Adicionado com sucesso!"));
        } else {
            res.status(201).send(JSON.stringify("Pedido já existe!"));
        }
        
    }
    catch(err){
        res.status(500).send(JSON.stringify("Erro ao enviar pedido de amizade: " + err));
    }
}

exports.aceitarPedido = async (req,res,next) => {
    try{
        const cod = req.body.cod;
        const email = req.body.email;
        const codDestinatario = await EstudanteModel.findByPk(email);
        await PedidoModel.destroy({
            where: {
              codUsuario: codDestinatario.cod,
              codDestinatario: cod
            }
        });
        const amizade1 = await AmizadeModel.create({codEstudante:cod, codAmigo: codDestinatario.cod});
        const amizade2 = await AmizadeModel.create({codEstudante:codDestinatario.cod, codAmigo: cod});
        res.status(200).send("Pedido aceito!");
    }
    catch(err){
        res.status(500).send(JSON.stringify("Erro ao aceitar o pedido de amizade : " + err));
    }
}

exports.recusarPedido = async (req,res,next) => {
    try{
        const email = req.body.email;
        const cod = req.body.cod;
        const codDestinatario = await EstudanteModel.findByPk(email);
        const pedido = await PedidoModel.destroy({
            where: {
              codUsuario: cod,
              codDestinatario: codDestinatario.cod
            }
        });
        res.status(200).send(JSON.stringify("Pedido recusado!"));
    }
    catch(err){
        res.status(500).send(JSON.stringify("Erro ao recusar o pedido de amizade : " + err));
    }
}

exports.removerAmigo = async (req,res,next) => {
    try{
        const email = req.body.email;
        const cod = req.body.cod;
        const codDestinatario = await EstudanteModel.findByPk(email);
        const pedido1 = await AmizadeModel.destroy({
        where: {
              codEstudante: cod,
              codAmigo: codDestinatario.cod
            }
        });
        const pedido2 = await AmizadeModel.destroy({
            where: {
                codEstudante: codDestinatario.cod,
                codAmigo: cod
            }
        });
        res.status(200).send(JSON.stringify("Amizade deletada!"));
    }
    catch(err){
        res.status(500).send(JSON.stringify("Erro ao excluir o pedido de amizade : " + err));
    }
}

exports.listarAmigos = async (req,res,next) => {
    try{
        const cod = req.body.cod;
        const amigos = await AmizadeModel.findAll({
            where: {
                codEstudante: cod
            }
        });
        let resposta = []
        for (const amigo of amigos) {
            let item = await EstudanteModel.findOne({
                attributes: ['percentualDeAcertos', 'totalAcertos', 'email', 'nome', 'cod'],
                where: {
                    cod: amigo.codAmigo
                }
            });
            resposta.push(item);
        }
        res.status(200).send(JSON.stringify(resposta));
    }
    catch(err){
        res.status(500).send("Erro ao listar os amigos");
    }
}

exports.listarAmigosEmComum = async (req,res,next) => {
    try{
        const codEstudante = req.body.codEstudante;
        const codAmigo = req.body.codAmigo;
        const amigosEmComum = await sequelize.query(`SELECT a1.codAmigo FROM amizades a1 INNER JOIN amizades a2 ON a1.codEstudante = ${codEstudante} AND a2.codEstudante = ${codAmigo} AND a1.codAmigo = a2.codAmigo`);
        res.status(200).send(amigosEmComum);
    }
    catch(err){
        res.status(500).send("Erro ao listar os amigos em comum");
    }
}

exports.listarPedidos = async (req,res,next) => {
    try{
        const cod = req.body.cod;
        const pedidos = await PedidoModel.findAll({
            where: {
                codDestinatario: cod
            }
        });
        let resposta = []
        for (const pedido of pedidos) {
            let item = await EstudanteModel.findOne({
                attributes: ['email', 'nome', 'cod'],
                where: {
                    cod: pedido.codUsuario
                }
            });
            resposta.push(item);
        }
        res.status(200).send(JSON.stringify(resposta));
    }
    catch(err){
        res.status(500).send("Erro ao listar os pedidos");
    }
}