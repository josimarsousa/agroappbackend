import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string
    password: string
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        console.log(email)

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário ou senha incorretos!")
        }

        //precisa verificar se a senha que o usuario envio esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorretos!")
        }

        //tudo ok, agora gera o token para o usuario
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
                process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

            return{
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            }

    }
}

export { AuthUserService }