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
        res.cookie("cookie1",token, {
            httpOnly:true,
            signed:false,
            secure:true, 
            sameSite:"lax", 
            path:"/", 
            domain:"localhost"
        })
        return res.send("probando123")
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}