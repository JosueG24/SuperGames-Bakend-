import { RequestHandler } from "express"
import { loginValidation, tokenValidator } from "../services/dataValidators.service"
import tokenService from "../services/SessionServices/getToken.service";

export const Login : RequestHandler= async (req, res, next)=>{
    try {
        const {userName,password } = req.body
        const validation = await loginValidation({userName, password}) 
        if(validation == false){
            return res.status(401).json({message:"Unauthorized", error:"validation failed"})    
        }
        // crear token y devolverlo
        const serviceResponse = tokenService.create(validation)
        return res.status(serviceResponse.status).setHeader("set-Cookie", serviceResponse.data).json({message:"Ok", error:null})
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}

export const LoginGuest : RequestHandler= async (req, res, next)=>{
    try {
        // crear token y devolverlo
        const serviceResponse = tokenService.create()
        return res.status(serviceResponse.status).setHeader("set-Cookie", serviceResponse.data).json({message:"Ok", error:null})
        
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}

export const logout : RequestHandler= (req, res, next)=>{
    try {
        const {myTokenName} = req.cookies;
        // validar token
        if(myTokenName == null){
            return res.status(404).json({message:"no existe el token", error:true, data:null})
        }
        const isValid = tokenValidator(myTokenName)
        // borrar token
        if(isValid == false){
            // si el token era invalido
            return res.status(401).clearCookie("myTokenName").json({message:"Invalid token", error:true, data:null})
        }
        // si todo esta correcto
        return res.status(200).clearCookie("myTokenName").json({message:"Logout succesfully", errror:false, data:null})
        
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}