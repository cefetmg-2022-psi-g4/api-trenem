const { DataTypes } = require('sequelize');
const sequelize = require("../services/db.js");

const RealizadasModel = sequelize.define("questoes_realizadas",{
    codEstudante: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idQuestao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    alternativaMarcada: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = RealizadasModel;

