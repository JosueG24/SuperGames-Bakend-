import { RequestHandler } from "express";
import pool from "../../Database/Pool";

import tokenService from "../services/SessionServices/getToken.service_V1";
import { newUserValidator } from "../services/dataValidators.service_V1";

export const newUser:RequestHandler = async (req, res, next)=>{
try {
    const { userName, email, password} =  req.body;

    // validamos los datos que recibimos
    const validationOfDates = await newUserValidator({ userName, email, password})
    if (validationOfDates == false){
        return res.status(400).json({message:"Ha ingresado datos invalidos", error:"La peticion contiene datos invalidos", data:null})
    }
    // Zona donde agregamos el usuario a la base de datos
        
        // grabar nuevo usuario
        const [result] = await pool.query("INSERT INTO  users(idUser, userName, email, password) VALUES (?, ?, ?, ?)", [validationOfDates.idUser, validationOfDates.userName, validationOfDates.email, validationOfDates.password]) as any
        if(result.affectedRows < 1){
            console.log({error:"No se guardoel nuevo usuario"})
            return res.status(500).json({message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet.", error:"fallo de la BD", data:null})
        }

    //Creamos el token de inicio de sesion
    const serviceResponse = tokenService.create(validationOfDates)

    // retornamos con una respuesta satisfactoria, se creo el usuario y se le entrega su token
    return res.status(serviceResponse.status).setHeader("set-Cookie", serviceResponse.data).json({message:serviceResponse.message, data:serviceResponse.data, error:serviceResponse.error})
} catch (error) {
    return res.status(500).json({message:"Error en el servidor", error, data:null})
}
}