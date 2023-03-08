import { RequestHandler, ErrorRequestHandler } from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export const pingPong : RequestHandler =(req, res, next)=>{
    try {
        // creamos el token encriptado
        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
            idUser : "0",
            userName: "guest",
            email : "notDefined",
            password: "notDefined"
        }, process.env.SECRET as string)
        // lo asignamos
        res.cookie("tokenPrueba",token, {
            httpOnly:true,
            secure:true, 
            sameSite:"none", 
            path:"/", 
            domain:"localhost"
        })
        return res.json({message:"probando123", error:false, data:null})
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error, data:null})
    }
}