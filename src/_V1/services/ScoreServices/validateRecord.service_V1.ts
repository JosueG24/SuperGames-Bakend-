import { responseService } from "../../types_V1";
import pool from "../../../Database/Pool";

interface params{
    mode:"memory"|"mines"|"snake",
    idUser:number,
    userName:string,
    puntuacion:number|string,
    level?:number|string
}

export default class handlerService{
    mode:"memory"|"mines"|"snake";
    idUser:number;
    userName:string;
    puntuacion:number|string;
    level?:number|string;
    DateFormated:number;

    constructor(params:params){
        const dateNow =new Date( Date.now());
        this.DateFormated = dateNow.getTime();
        this.mode = params.mode
        this.idUser = params.idUser
        this.userName = params.userName
        this.puntuacion = params.puntuacion
        this.level = params.level
        if(params.level == ""){
            this.level = 1
        }
    }

    public async master():Promise<responseService>{
        switch (this.mode) {
            case "memory":
                return this.memory()
            case "mines":
                return this.mines()
            case "snake":
                return this.snake()
        
            default:
                return handlerService.badRequest()
        }
    }

    private async memory():Promise<responseService>{
        const [puntuacionPrevia] = await pool.query("SELECT * FROM memory_ranck where userName = ?", [this.userName]) as any;
        // si aún no hay registros de este modo de juego, entonces creelos
        if(puntuacionPrevia.length < 1){
            const[primerPuntuacionSave] = await pool.query("INSERT INTO memory_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [this.idUser,this.userName,this.puntuacion,this.DateFormated,this.level ])
            return {status:200, message:"Primer registro guardado", error:null, data:"firstGame"}
        }else{
            // si ya existe compare si es mayor
            const [mejorPuntuacion] = puntuacionPrevia;
            // mejorPuntuacion = {idUser, userName, puntos, date, level}
            if(mejorPuntuacion.puntos < this.puntuacion){
                // si los datos almacenados son mayores que los nuevos datos
                return {status:200, message:"siRecord", error:null, data:true}
            }else{
                return {status:200, message:"noRecord", error:null, data:false}
            }
        }
    }
    private async mines():Promise<responseService>{
        const [puntuacionPrevia] = await pool.query("SELECT * FROM mine_ranck where userName = ?", [this.userName]) as any;
        if(puntuacionPrevia.length == 0){
            const[primerPuntuacionSave] = await pool.query("INSERT INTO mine_ranck (idUser, userName, puntos, date, level) VALUES (?, ?, ?, ?, ?);", [this.idUser,this.userName,this.puntuacion,this.DateFormated,this.level ])
            return {status:200, message:"Primer registro guardado", error:null, data:"firstGame"}
        }else{
            const [mejorPuntuacion] = puntuacionPrevia;
            if(mejorPuntuacion.puntos < this.puntuacion){
                return {status:200, message:"siRecord", error:null, data:true}
            }else{
                return {status:200, message:"noRecord", error:null, data:false}
            }
        }
    }
    private async snake():Promise<responseService>{
        const [puntuacionPrevia] = await pool.query("SELECT * FROM snake_ranck where userName = ?", [this.userName]) as any;
        if(puntuacionPrevia.length == 0){
            const[primerPuntuacionSave] = await pool.query("INSERT INTO snake_ranck (idUser, userName, puntos, date) VALUES (?, ?, ?, ?);", [this.idUser,this.userName,this.puntuacion,this.DateFormated])
            return {status:200, message:"Primer registro guardado", error:null, data:"firstGame"}
        }else{
            const [mejorPuntuacion] = puntuacionPrevia;
            if(mejorPuntuacion.puntos < this.puntuacion){
                return {status:200, message:"siRecord", error:null, data:true}
            }else{
                return {status:200, message:"noRecord", error:null, data:false}
            }
        }
    }

    private static serverError(error:any):responseService{
        let res = {status: 500, message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet.",data:null, error};
        return res;
    }
    private static badRequest():responseService{
        let res = {status: 400, message:"Mala peticion", data:null, error:"bad request"};
        return res;
    }
}