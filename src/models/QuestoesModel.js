const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../../data/trenem-db.sqlite",
    logging: console.log,
});

const QuestoesModel = sequelize.define("questoes",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    origem: {
        type: DataTypes.STRING,
    },
    enunciado: {
        type: DataTypes.STRING
    },
    alternativas: {
        type: DataTypes.STRING
    },
    gabarito: {
        type: DataTypes.STRING
    },
    materia: {
        type: DataTypes.STRING
    },
    supertopico: {
        type: DataTypes.STRING
    },
    topico: {
        type: DataTypes.STRING
    },
    subtopico: {
        type: DataTypes.STRING
    }
});

module.exports = QuestoesModel;