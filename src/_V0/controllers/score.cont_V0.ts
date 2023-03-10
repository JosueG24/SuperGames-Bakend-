import { RequestHandler, response } from "express";
import { tokenValidator } from "../services/dataValidators.service_V0";
import pool from "../../Database/Pool";
import { tokenExtract } from "../types_V0";

import savewScoreService from "../services/ScoreServices/saveScore.service_V0";
import ranckingsService from "../services/ScoreServices/ranckings.service_V0";
import validateRecordService from "../services/ScoreServices/validateRecord.service_V0";

export const saveScore : RequestHandler = async (req, res, next)=>{
    try {
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:"token inexistente", data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:"token invalido", data:null})
        const {puntuacion, mode, level} = req.body;
        
        const service = new savewScoreService({mode:mode,level:level, puntuacion:puntuacion, userName:isValid.userName})
        const playService = await service.master()
        return res.status(playService.status).json({message:playService.message, error:playService.error, data:null})
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const ranking_glogal : RequestHandler = async(req, res, next)=>{
    try {
        const {mode, userName} = req.body;
        
        // anulamos la validacion de tokem devido a que la V0 es solo para pruebas
        // const {myTokenName} = req.cookies;
        // if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:"token inexistente", data:null})
        // const isValid:tokenExtract|boolean = tokenValidator(myTokenName)
        // if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:"tokien invalido", data:null})
        // const {userName} = isValid;

        const service = new ranckingsService({mode:mode, ranck:"global", userName:userName})
        const playService = await service.master()
        return res.status(playService.status).json({message:playService.message, error:playService.error, data:playService.data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const ranking_mensual : RequestHandler = async (req, res, next)=>{
    try {
        const {mode, userName} = req.body;

        // anulamos la validacion de tokem devido a que la V0 es solo para pruebas
        // const {myTokenName} = req.cookies;
        // if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:"token inexistente", data:null})
        // const isValid = tokenValidator(myTokenName)
        // if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:"token invalido", data:null})
        // const {userName} = isValid;

        const service = new ranckingsService({mode:mode, ranck:"mensual", userName:userName})
        const playService = await service.master()
        return res.status(playService.status).json({message:playService.message, error:playService.error, data:playService.data})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const validate_record : RequestHandler = async (req, res, next)=>{
    try {
        const {mode, puntuacion, level} = req.body;
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:"token inexistente", data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:"token invalido", data:null})

        if(isValid.userName == "guest"){
            return res.status(200).json({message: "invitado", error:null, data:null})
        }
        const service = new validateRecordService({mode:mode, idUser:isValid.idUser, userName:isValid.userName, puntuacion:puntuacion, level: level})
        const playService = await service.master()
        return res.status(playService.status).json({message:playService.message, error:playService.error, data:playService.data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}