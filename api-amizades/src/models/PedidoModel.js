const { DataTypes } = require('sequelize');
const sequelize = require("../services/db.js");

const PedidoModel = sequelize.define("pedidos_amizades",{
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true       
    },
    codDestinatario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = PedidoModel;