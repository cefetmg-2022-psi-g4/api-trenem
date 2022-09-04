const jwt = require("jsonwebtoken");

exports.gerarToken = (email) => {
    try{
        const token = jwt.sign({ email: email }, process.env.SECRET, {
            expiresIn: 86400
        });

        return token;
    }catch(err){
        return err;
    }  
} 