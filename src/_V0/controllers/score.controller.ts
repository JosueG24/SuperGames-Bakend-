import { RequestHandler, response } from "express";
import { tokenValidator } from "../services/dataValidators.service";
import pool from "../../Database/Pool";
import { tokenExtract } from "../types";
import savewScoreService from "../services/ScoreServices/saveScore.service";
import ranckingsService from "../services/ScoreServices/ranckings.service";

export const saveScore : RequestHandler = async (req, res, next)=>{
    try {
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:true, data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:true, data:null})
        const {puntuacion, mode, level} = req.body;
        
        const service = new savewScoreService({mode:mode,level:level, puntuacion:puntuacion, userName:isValid.userName})
        const playService = await service.master()
        console.log({playService})
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const ranking_glogal : RequestHandler = async(req, res, next)=>{
    try {
        const {mode} = req.body;
        
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:true, data:null})
        const isValid:tokenExtract|boolean = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:true, data:null})
        const {userName} = isValid;

        const service = new ranckingsService({mode:mode, ranck:"global", userName:isValid.userName})
        const playService = await service.master()
        console.log({respGlobal:playService})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const ranking_mensual : RequestHandler = async (req, res, next)=>{
    try {
        const {mode} = req.body;

        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:true, data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:true, data:null})
        const {userName} = isValid;

        const service = new ranckingsService({mode:mode, ranck:"mensual", userName:isValid.userName})
        const playService = await service.master()
        console.log({respMensual:playService})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}

export const validate_record : RequestHandler = async (req, res, next)=>{
    try {
        const {mode, puntuacion, level} = req.body;
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(401).json({message:"Unauthorized", error:true, data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Unauthorized", error:true, data:null})

        const dateNow =new Date( Date.now());
        const DateFormated = dateNow.getTime();

        if(isValid.userName == "guest"){
            return res.status(200).json({message: "invitado", error:null, data:null})
        }

        switch (mode) {
            case "memory":
                {
                    const [puntuacionPreviaMe] = await pool.query("SELECT * FROM memory_ranck where userName = ?", [isValid.userName]) as any;
                    // si aún no hay registros de este modo de juego, entonces creelos
                    if(puntuacionPreviaMe.length < 1){
                        const[primerPuntuacionSaveMe] = await pool.query("INSERT INTO memory_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [isValid.idUser,isValid.userName,puntuacion,DateFormated,level ])
                        return res.status(200).json({message:"Primer registro guardado", error:null, data:primerPuntuacionSaveMe})
                    }else{
                        // si ya existe compare si es mayor
                        const [mejorPuntuacionMe] = puntuacionPreviaMe;
                        // mejorPuntuacion = {idUser, userName, puntos, date, level}
                        if(mejorPuntuacionMe.puntos > puntuacion){
                            // si los datos almacenados son mayores que los nuevos datos
                            return res.status(200).json({ message:"siRecord", error:null, data:null})
                        }else{
                            return res.status(200).json({ message:"noRecord", error:null, data:null})
                        }
                    }
                }
            case "mines":
                {
                    const [puntuacionPreviaMi] = await pool.query("SELECT * FROM mine_ranck where userName = ?", [isValid.userName]) as any;
                    if(puntuacionPreviaMi.length == 0){
                        const[primerPuntuacionSaveMi] = await pool.query("INSERT INTO mine_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [isValid.idUser,isValid.userName,puntuacion,DateFormated,level ])
                        return res.status(200).json({message:"Primer registro guardado", error:null, data:primerPuntuacionSaveMi})
                    }else{
                        const [mejorPuntuacionMi] = puntuacionPreviaMi;
                        if(mejorPuntuacionMi.puntos >= puntuacion){
                            return res.status(200).json({ message:"siRecord", error:null, data:null})
                        }else{
                            return res.status(200).json({ message:"noRecord", error:null, data:null})
                        }
                    }
                }
            case "snake":
                {
                    const [puntuacionPreviaSn] = await pool.query("SELECT * FROM snake_ranck where userName = ?", [isValid.userName]) as any;
                    if(puntuacionPreviaSn.length == 0){
                        const[primerPuntuacionSaveSn] = await pool.query("INSERT INTO snake_ranck (idUser, userName, puntos, date) VALUES (?, ?, ?, ?);", [isValid.idUser,isValid.userName,puntuacion,DateFormated])
                        return res.status(200).json({message:"Primer registro guardado", error:null, data:primerPuntuacionSaveSn})
                    }else{
                        const [mejorPuntuacionSn] = puntuacionPreviaSn;
                        if(mejorPuntuacionSn.puntos >= puntuacion){
                            return res.status(200).json({ message:"siRecord", error:null, data:null})
                        }else{
                            return res.status(200).json({ message:"noRecord", error:null, data:null})
                        }
                    }
                }
            default:
                return res.status(400).json({message:"Bad Request", error:true, data:null})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}