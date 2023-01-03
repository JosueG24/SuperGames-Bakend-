import { RequestHandler, ErrorRequestHandler } from "express"

export const pingPong : RequestHandler =(req, res, next)=>{
    return res.status(200).json("pong")
}