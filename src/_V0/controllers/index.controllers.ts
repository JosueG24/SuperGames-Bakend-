import { RequestHandler, ErrorRequestHandler } from "express"

export const pingPong : RequestHandler =(req, res, next)=>{
    try {
        // crear token y devolverlo
        return res.status(200).json({message:"pong",data:null})
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}