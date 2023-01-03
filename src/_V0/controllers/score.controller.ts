import { RequestHandler } from "express";

export const saveScore : RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en saveScore")
}

export const ranking_glogal : RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en ranking_glogal")
}

export const ranking_mensual : RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en ranking_mensual")
}

export const validate_record : RequestHandler = (req, res, next)=>{
    return res.status(200).json("Estamos en validate_record")
}