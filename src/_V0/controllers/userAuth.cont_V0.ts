import { RequestHandler } from "express"
import { loginValidation, tokenValidator } from "../services/dataValidators.service_V0"
import tokenService from "../services/SessionServices/getToken.service_V0";

export const Login : RequestHandler= async (req, res, next)=>{
    try {
        const {userName,password } = req.body
        const validation = await loginValidation({userName, password}) 
        if(validation == false){
            return res.status(401).json({message:"Unauthorized", error:"validation failed", data:null})    
        }
        // crear token y devolverlo
        const serviceResponse = tokenService.create(validation)
        return res.status(serviceResponse.status).setHeader("set-Cookie", serviceResponse.data).json({message:"Ok", error:null, data:null})
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error, data:null})
    }
}

export const LoginGuest : RequestHandler= async (req, res, next)=>{
    try {
        // crear token y devolverlo
        const serviceResponse = tokenService.create()
        return res.status(serviceResponse.status).setHeader("set-Cookie", serviceResponse.data).json({message:"Ok", error:null, data:null})
        
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error, data:null})
    }
}

export const logout : RequestHandler= (req, res, next)=>{
    try {
        const {myTokenSession} = req.cookies;
        // validar token
        if(myTokenSession == null){
            return res.status(404).json({message:"no existe el token", error:"token inexistente", data:null})
        }
        const isValid = tokenValidator(myTokenSession)
        // borrar token
        if(isValid == false){
            // si el token era invalido
            return res.status(401).clearCookie("myTokenSession").json({message:"Invalid token", error:"token invalido", data:null})
        }
        // si todo esta correcto
        return res.status(200).clearCookie("myTokenSession").json({message:"Logout succesfully", errror:false, data:null})
        
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error, data:null})
    }
}