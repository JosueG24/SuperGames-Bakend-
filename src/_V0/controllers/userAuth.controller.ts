import { RequestHandler } from "express"

export const Login : RequestHandler= (req, res, next)=>{
    return res.status(200).json("Estamos en Login")
}

export const LoginGuest : RequestHandler= (req, res, next)=>{
    return res.status(200).json("Estamos en LoginGuest")
}

export const logout : RequestHandler= (req, res, next)=>{
    return res.status(200).json("Estamos en Logout")
}