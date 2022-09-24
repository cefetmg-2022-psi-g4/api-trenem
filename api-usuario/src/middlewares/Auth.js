const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "Nenhum token enviado" });
    }

    const [scheme, token] = authHeader.split(" ");

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    req.email = decoded.email;

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token invalido" });
  }
};