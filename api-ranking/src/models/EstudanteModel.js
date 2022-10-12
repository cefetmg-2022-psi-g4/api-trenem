const { DataTypes } = require('sequelize');
const sequelize = require("../services/db.js");

const EstudanteModel = sequelize.define("estudante",{
    nome: {
        type: DataTypes.STRING,       
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    senha: {
        type: DataTypes.STRING
    },
    cod: {
        type: DataTypes.INTEGER
    },
    foto:{
        type: DataTypes.BLOB
    },
    percentualDeAcertos: {
        type: DataTypes.REAL
    },
    tempoMedio:{
        type: DataTypes.REAL
    },
    token: {
        type: DataTypes.STRING
    },
    totalQuestoesFeitas: {
        type: DataTypes.INTEGER
    },
    totalAcertos: {
        type: DataTypes.REAL
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = EstudanteModel;