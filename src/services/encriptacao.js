const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.gerarHash = async (senha) => {
    try{
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    }catch(err){
        return err;
    }  
} 

exports.compararHash = async (senha, hash) => {
    try{
        const resultado = await bcrypt.compare(senha, hash);
        return resultado;
    }catch(err){
        return err;
    }
}