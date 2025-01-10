"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //recebendo o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        //return res.status(401).end()
        return res.status(401).json({ message: 'token nao fornecido' });
    }
    //verificando o token
    const [, token] = authToken.split(" ");
    //validando o tokjen
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //recupera o id do token e coloca na variavel user_id dentro do request
        req.user_id = sub;
        //se tudo ok, prosegue
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
