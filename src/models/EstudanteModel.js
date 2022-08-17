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
        type: DataTypes.STRING,
        set(value){
            this.setDataValue('password', hash(value));
        }
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
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = EstudanteModel;