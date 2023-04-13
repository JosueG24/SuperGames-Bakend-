import pool from "../../../Database/Pool"
import { responseService } from "../../types_V0"

interface params{
    mode:"memory"|"mines"|"snake",
}

export default class handlerService{
    mode:"memory"|"mines"|"snake";
    DateFormated: number;
    latestMonth: number;

    constructor(params:params){
        const dateNow =new Date( Date.now());
        this.DateFormated = dateNow.getTime();
        const dateNow2 = Math.round(new Date().getTime()/1000.0)
        this.latestMonth = dateNow2 - 2629743;

        this.mode = params.mode
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
        const top10 = await pool.query("select * from memory_ranck order by puntos desc limit 10;");
        return {status:200, message:"datos enviados",error:null, data: {top:top10[0]}}
    }
    private async mines():Promise<responseService>{

        const top10 = await pool.query("select * from mine_ranck order by puntos desc limit 10;");
        return {status:200, message:"datos enviados", error:null, data: {top:top10[0]}}

    }
    private async snake():Promise<responseService>{
        const top10 = await pool.query("select * from snake_ranck order by puntos desc limit 10;");
        return {status:200, message:"datos enviados", error:null, data: {top:top10[0]}}
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