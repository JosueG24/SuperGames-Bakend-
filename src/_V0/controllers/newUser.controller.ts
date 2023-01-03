import { RequestHandler } from "express";

export const newUser:RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en el newUser")
}