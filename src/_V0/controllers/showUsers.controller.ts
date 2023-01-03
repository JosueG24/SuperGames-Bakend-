import { RequestHandler } from "express";

export const showAll: RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en showAll")
}

export const showOne: RequestHandler = (req, res, next)=>{
    const {name} = req.params
    return res.status(200).json("Estamos en showOne: "+name)
}