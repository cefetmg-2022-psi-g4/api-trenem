const { DataTypes } = require('sequelize');
const sequelize = require("../services/db.js");

const QuestoesModel = sequelize.define("questoes",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    origem: {
        type: DataTypes.TEXT,
    },
    enunciado: {
        type: DataTypes.TEXT
    },
    alternativas: {
        type: DataTypes.TEXT
    },
    gabarito: {
        type: DataTypes.TEXT
    },
    materia: {
        type: DataTypes.TEXT
    },
    supertopico: {
        type: DataTypes.TEXT
    },
    topico: {
        type: DataTypes.TEXT
    },
    subtopico: {
        type: DataTypes.TEXT
    }
});

const questoes = new Array();

const materias = ["matematica", "biologia", "quimica", "fisica", "historia", "linguagens", "geografia-sociologia-e-filosofia"];

pegarQuestoes = async () => {
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
};

await pegarQuestoes();

module.exports = {QuestoesModel, questoes};