import { RequestHandler, ErrorRequestHandler } from "express"
import dotenv from 'dotenv';
dotenv.config();

export const pingPong : RequestHandler =(req, res, next)=>{
    try {
        const cookies = req.cookies
        return res.status(200).json({message:"pong",data:cookies})
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}