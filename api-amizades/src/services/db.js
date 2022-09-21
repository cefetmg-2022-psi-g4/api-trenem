const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname,'../../../data/trenem-db.sqlite'),
    logging: console.log,
});

sequelize
    .authenticate()
    .then(()=>{
        console.log('Conexão funcionando!');
    }).catch (err =>{
        console.error('Não foi possível conectar devido a :',err);
    });

module.exports = sequelize;