import { RequestHandler } from "express"
import { loginValidation } from "../services/dataValidators.service"
import tokenService from "../services/indexRoutes/getToken.service";

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
        console.log(req.cookies)
        return res.status(200).json("Estamos en Logout")
        
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor", error})
    }
}