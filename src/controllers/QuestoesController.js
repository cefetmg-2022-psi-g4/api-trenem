const QuestoesModel = require("../models/QuestoesModel");

exports.pesquisarTudo = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
        id:'0',
        origem:'Enem Digital 2020',
        enunciado:'<p> Os tempos gastos por três alunos para resolver um mesmo exercício de matemática foram: 3,25 minutos; 3,4 minutos e 191 segundos.</p><p>O tempo gasto a mais, em segundo, pelo aluno que concluiu por último a resolução do exercício, em relação ao primeiro que o finalizou, foi igual a</p>',
        alternativas:'<li>13.</li><li> 14.</li><li> 15.</li><li> 21.</li><li> 29</li>',
        gabarito:'A',
        materia:'matematica',
        supertopico:'Matemática No Enem ',
        topico:'Matemática Básica',
        subtopico:'Aritmética: I '
    });
};

exports.pesquisarModos = async (req, res, next) => {
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
};


exports.pesquisarPorId = async (req, res, next) => {
    const id = req.params.id;
    const questao = await QuestoesModel.findByPk(id);
    res.status(200).send(JSON.stringify(questao));
};

exports.pesquisarPorMateria = async (req, res, next) => {
    const materia = req.params.materia;
    const questoes = await QuestoesModel.findAll({
        where: {
            materia: materia,
        },
    });
    res.status(200).send(JSON.stringify(questoes));
};