import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes'
import fileUpload, { UploadedFile } from 'express-fileupload'


const app = express()
app.use(express.json())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024}
}))
app.use(cors({
    origin: ['https://agroappfrontend.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

/*const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token){
        return res.status(401).send('token nao fornecido')
    }
    next()
}

app.use((req: Request, res: Response, next: NextFunction) => {
    if(req.path === '/users' && req.method === 'POST'){
        return next()
    }
    authMiddleware(req, res, next)
})*/

app.use(router)

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})


app.listen(process.env.PORT || 3000, () => console.log("Servidor Online!!"))