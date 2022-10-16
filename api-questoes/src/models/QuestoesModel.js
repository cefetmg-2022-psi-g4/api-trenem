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
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {QuestoesModel};

