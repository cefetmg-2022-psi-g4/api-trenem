const PedidoModel = require("../models/PedidoModel");
const AmizadeModel = require("../models/AmizadeModel");
const EstudanteModel = require("../models/EstudanteModel");

exports.enviarPedidoDeAmizade = async (req,res,next) => { 
    try{
        const email = req.body.email;
        const cod = req.body.cod;
        const codDestinatario = await EstudanteModel.findByPk(email);
        const pedido = await PedidoModel.create({codUsuario : cod, codDestinatario : codDestinatario.cod });
        res.status(200).send(JSON.stringify("Adicionado com sucesso!"));

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
              codUsuario: cod,
              codDestinatario: codDestinatario.cod
            }
        });
        const amizade = await AmizadeModel.create({codEstudante:cod, codAmigo: codDestinatario.cod});
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
        const pedido = await AmizadeModel.destroy({
            where: {
              codEstudante: cod,
              codAmigo: codDestinatario.cod
            }
        });
        res.status(200).send(JSON.stringify("Amizade deletada!"));
    }
    catch(err){
        res.status(500).send(JSON.stringify("Erro ao excluir o pedido de amizade : " + err));
    }
}
