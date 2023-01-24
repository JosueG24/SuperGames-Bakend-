import { RequestHandler, response } from "express";
import { tokenValidator } from "../services/dataValidators.service";
import pool from "../../Database/Pool";
import { tokenExtract } from "../types";

export const saveScore : RequestHandler = (req, res, next)=>{
    try {
        const {myTokenName} = req.cookies;
        if(myTokenName == null) return res.status(404).json({message:"no existe el token", error:true, data:null})
        const isValid = tokenValidator(myTokenName)
        if(isValid == false) return res.status(401).clearCookie("myTokenName").json({message:"Invalid token", error:true, data:null})

        return res.status(200).json("Estamos en saveScore")
    } catch (error) {
        
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
        switch (mode) {
            case "memory":
                const top10 = await pool.query("select * from memory_ranck order by puntos desc limit 10;");
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,  // ojo cambiar
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition = await pool.query("select * from memory_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10[0], myPosition:myPosition[0]}})
                }
            case "mines":
                const top10_1 = await pool.query("select * from mine_ranck order by puntos desc limit 10;");
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10_1[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition_1 = await pool.query("select * from mine_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10_1[0], myPosition:myPosition_1[0]}})
                }
            case "snake":
                const top10_2 = await pool.query("select * from snake_ranck order by puntos desc limit 10;");
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10_2[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition_2 = await pool.query("select * from snake_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10_2[0], myPosition:myPosition_2[0]}})
                }
            default:
                return res.status(404).json({message:"bad request", error:true, data:null})
        }
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

        const dateNow = Math.round(new Date().getTime()/1000.0)
        const latestMonth = dateNow - 2629743;

        switch (mode) {
            case "memory":
                const top10 = await pool.query("select * from memory_ranck where date >= ? order by puntos desc limit 10;", [latestMonth]);
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition = await pool.query("select * from memory_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10[0], myPosition:myPosition[0]}})
                }
            case "mines":
                const top10_1 = await pool.query("select * from mine_ranck where date >= ? order by puntos desc limit 10;",[latestMonth]);
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10_1[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition_1 = await pool.query("select * from mine_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10_1[0], myPosition:myPosition_1[0]}})
                }
            case "snake":
                const top10_2 = await pool.query("select * from snake_ranck where date >= ? order by puntos desc limit 10;", [latestMonth]);
                if(userName == "guest"){
                    return res.status(200).json({message:"datos enviados", data: {top:top10_2[0], myPosition:[[{
                        idUser: 0,
                        userName: 'Invitado',
                        puntos: 0,
                        date: 1671396905067,
                        level: 0
                      }]]
                    }})
                }else{
                    const myPosition_2 = await pool.query("select * from snake_ranck where userName = ? ;", [userName]);
                    return res.status(200).json({message:"datos enviados", data: {top:top10_2[0], myPosition:myPosition_2[0]}})
                }

            default:
                return res.status(404).json({message: "Bad Request", error:true, data:null})
        }
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
                return res.status(404).json({message:"Bad Request", error:true, data:null})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}