import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string
}

function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
   //recebendo o token
   const authToken = req.headers.authorization

   if(!authToken){
    return res.status(401).end()
   }
   
   //verificando o token
   const [, token] = authToken.split(" ")
   
   //validando o tokjen
   try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        )as Payload;

        //recupera o id do token e coloca na variavel user_id dentro do request
        req.user_id = sub

        //se tudo ok, prosegue
        return next()

   } catch (error) {
        return res.status(401).end()
   }
}

export { isAuthenticated }