import pool from "../../../Database/Pool"
import { responseService } from "../../types_V0"

interface params{
    mode:"memory"|"mines"|"snake",
    userName:string,
    puntuacion:number|string,
    level?:number|string
}

export default class handlerService{
    DateFormated:number;
    mode:"memory"|"mines"|"snake";
    puntuacion:number|string;
    level:number|string|undefined;
    userName:string;

    constructor(params:params){
        const dateNow =new Date( Date.now());
        this.DateFormated = dateNow.getTime();
        this.mode = params.mode
        this.puntuacion = params.puntuacion
        this.userName = params.userName
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
        const response = await pool.query("Update memory_ranck Set puntos =?, date=?, level=? where userName = ?;", [this.puntuacion, this.DateFormated, this.level, this.userName])    
        return {status:200, message: "hemos actualizado el registro", error:null, data:response}
    }
    private async mines():Promise<responseService>{
        const response = await pool.query("Update mine_ranck Set puntos =?, date=?, level=? where userName = ?;", [this.puntuacion, this.DateFormated, this.level, this.userName])    
        return {status:200, message: "hemos actualizado el registro", error:null, data:response}
    }
    private async snake():Promise<responseService>{
        const response = await pool.query("Update snake_ranck Set puntos =?, date=? where userName = ?;", [this.puntuacion, this.DateFormated, this.userName])    
        return {status:200, message: "hemos actualizado el registro", error:null, data:response}        
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