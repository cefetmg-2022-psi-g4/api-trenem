const QuestoesModel = require("../models/QuestoesModel");

exports.pesquisarTudo = async (req, res, next) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        const questoes = await QuestoesModel.findAll();
        res.status(200).send(
            JSON.stringify(questoes)
        );
    }catch(err){
        res.status(500).send(JSON.stringify(err));
    }
};

exports.pesquisarModos = async (req, res, next) => {
    try{
        const modo = req.params.modo;
        res.header("Access-Control-Allow-Origin", "*");
        const modos = [{
            id:'0',
            nome:'Corrida Contra o Tempo',
            descricao:'Este modo consiste em realizar questões antes que o tempo acabe.',
        },
        {
            id:'1',
            nome:'Provão',
            descricao:'Neste modo, você fará algo parecido com um simulado com varias questões de diferentes matérias.',
        },
        {
            id:'2',
            nome:'Matérias',
            descricao:'Neste modo você escolhe uma materia para realizar questões especificas.',
        },
        {
            id:'3',
            nome:'Versus',
            descricao:'Neste modo você e um outro jogador terão um minuto para responderem questoẽs.',
        }];
        const result = modos.at(modo);

        res.status(200).send(result);
    } catch(err){
        res.status(500).send(JSON.stringify(err));
    }
};


exports.pesquisarPorId = async (req, res, next) => {
    try{
        const id = req.params.id;
        const questao = await QuestoesModel.findByPk(id);
        res.status(200).send(JSON.stringify(questao));
    }catch(err){
        res.status(500).send(JSON.stringify(err));
    }
};

exports.pesquisarPorMateria = async (req, res, next) => {
    try{
        const materia = req.params.materia;
        const questoes = await QuestoesModel.findAll({
            where: {
                materia: materia,
            },
        });
        res.status(200).send(JSON.stringify(questoes));
    }catch(err){
        res.status(500).send(JSON.stringify(err));
    }
};