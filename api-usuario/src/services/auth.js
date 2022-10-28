const jwt = require("jsonwebtoken");

exports.gerarToken = (email) => {
    try{
        const token = jwt.sign({ email: email }, process.env.SECRET, {
            expiresIn: 86400
        });
        console.log(process.env.SECRET)
        console.log(token);
        return token;
    }catch(err){
        return err;
    }  
} 