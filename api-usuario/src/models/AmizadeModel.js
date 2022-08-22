const { DataTypes } = require('sequelize');
const sequelize = require("../services/db.js");

const AmizadeModel = sequelize.define("amizades",{
    codEstudante: {
        type: DataTypes.INTEGER,
        primaryKey: true       
    },
    codAmigo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = AmizadeModel;