const {QuestoesModel} = require("../models/QuestoesModel");
const {RealizadasModel} = require("../models/RealizadasModel");

let ok = 0;
let questoes = new Array();
const materias = ["matematica", "biologia", "quimica", "fisica", "historia", "linguagens", "geografia-sociologia-e-filosofia"];

async function pegarQuestoes () {
    if(ok)return;
    for(materia of materias){
        try{
            const questoesMateria = await QuestoesModel.findAll({
                where: {
                    materia: materia,
                }
            });
            questoes[materia] = questoesMateria;
        }
        catch(err){
            console.log("Erro ao salvar as questoes de " + materia);
        }
    }
    ok = 1;
};

exports.pesquisarTudo = async (req, res, next) => {
    await pegarQuestoes();
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send("Questões pesquisadas!");
    }catch(err){
        res.status(500).send(JSON.stringify(err));
    }
};

// exports.pesquisarPorId = async (req, res, next) => {
//     try{
//          const id = req.params.id;
//          const questao = await QuestoesModel.findByPk(id);
//          res.status(200).send(JSON.stringify(questao));
//      }catch(err){
//          res.status(500).send(JSON.stringify(err));
//     }
// };

// pesquisarPorMateria = async (materia) => {
//     try{
//         const materia = req.params.materia;
//         const questoes = await QuestoesModel.findAll({
//             where: {
//                 materia: materia,
//             }
//         });
//         res.status(200).send(JSON.stringify(questoes,null,2));
//     }catch(err){
//         res.status(500).send(JSON.stringify(err));
//     }
// };


const selecionarQuestoes = async (cod, materia, qtd) => {
    await pegarQuestoes();
    try{
        const realizadasBd = await RealizadasModel.findAll({
            where:{
                codEstudante : cod
            }
        });

        let realizadas = new Array();
        
        for(var i=0;i<realizadasBd.length;++i){
            if(realizadasBd[i].idQuestao>=inicio&&realizadasBd[i].idQuestao<inicio+questoes[materia].length)
                realizadas.push(realizadasBd[i].idQuestao);
        }

        realizadas.sort();

        let lista = new Array(), idx = 0, inicio = questoes[materia][0].id;

        for(var i=inicio;i<inicio+questoes[materia].length;++i){
            
            if(idx!=realizadas.length&&realizadas[idx]==i){
                idx++;
            }else{
                lista.push(i);
            }
        }
        
        let selecionadas = new Array(), resposta = new Array();

        while(qtd--){
            let random = Math.random()*lista.length;

            while(selecionadas.includes(random)){
                random = Math.random()*lista.length;
            }
            
            random = Math.floor(random);
            selecionadas += random;
            resposta.push(questoes[materia][random]);
        }
        return resposta;
    }
    catch(err){
        console.log(err);
    }
}

exports.criarProvao = async (req, res, next) => {
    //10 questoes: 3 matematica, 2 port, 1 hist, 1 geo, 1 bio, 1 fis, 1 quis
    await pegarQuestoes();
    try{
        const cod = req.body.cod;
        let provao = new Array(), tmp = new Array();
        tmp = await selecionarQuestoes(cod,'matematica',3);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'linguagens',2);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'historia',1);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'geografia-sociologia-e-filosofia',1);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'biologia',1);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'fisica',1);
        provao = provao.concat(tmp);
        tmp = await selecionarQuestoes(cod,'quimica',1);
        provao = provao.concat(tmp);
        let provaoRandomizado = provao
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        res.status(200).send(JSON.stringify(provaoRandomizado));

     }catch(err){
         res.status(500).send(JSON.stringify(err));
    }
};
