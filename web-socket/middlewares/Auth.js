const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (authHeader) => {
  try {
    
    if (!authHeader) {
      return new Error("Erro de autenticação");
    }

    const [scheme, token] = authHeader.split(" ");

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    return decoded.email;
  } catch (err) {
    return res.status(401).send({ error: "Token invalido" });
  }
};