const { DataTypes } = require('sequelize');
const sequelize = require("../../../api-usuario/src/services/db.js");

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