import pool from "../../../Database/Pool"
import { responseService } from "../../types_V0"

interface params{
    mode:"memory"|"mines"|"snake",
    ranck:"global"|"mensual",
    userName:string,
}

export default class handlerService{
    mode:"memory"|"mines"|"snake";
    ranck:"global"|"mensual";
    userName:string;
    DateFormated: number;
    latestMonth: number;

    constructor(params:params){
        const dateNow =new Date( Date.now());
        this.DateFormated = dateNow.getTime();
        const dateNow2 = Math.round(new Date().getTime()/1000.0)
        this.latestMonth = dateNow2 - 2629743;

        this.mode = params.mode
        this.ranck = params.ranck
        this.userName = params.userName
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
        let top10;
        if(this.ranck = "global"){
            top10 = await pool.query("select * from memory_ranck order by puntos desc limit 10;");
        }else{
            top10 = await pool.query("select * from memory_ranck where date >= ? order by puntos desc limit 10;", [this.latestMonth]);
        }
            if(this.userName == "guest"){
                return {status:200, message:"datos enviados",error:null, data: {top:top10[0], myPosition:{
                    idUser: 0,
                    userName: 'Invitado',
                    puntos: 0,
                    date: this.DateFormated,
                    level: 0
                }
                }}
            }else{
                const myPosition = await pool.query("select * from memory_ranck where userName = ? ;", [this.userName]);
                return {status:200, message:"datos enviados", error:null, data: {top:top10[0], myPosition:myPosition[0]}}
            }
    }
    private async mines():Promise<responseService>{
        let top10;
        if(this.ranck = "global"){
            top10 = await pool.query("select * from mine_ranck order by puntos desc limit 10;");
        }else{
            top10 = await pool.query("select * from mine_ranck where date >= ? order by puntos desc limit 10;",[this.latestMonth]);
        }
        if(this.userName == "guest"){
            return {status:200, message:"datos enviados", error:null, data: {top:top10[0], myPosition:{
                idUser: 0,
                userName: 'Invitado',
                puntos: 0,
                date: this.DateFormated,
                level: 0
              }
            }}
        }else{
            const myPosition = await pool.query("select * from mine_ranck where userName = ? ;", [this.userName]);
            return {status:200, message:"datos enviados", error:null, data: {top:top10[0], myPosition:myPosition[0]}}
        }
    }
    private async snake():Promise<responseService>{
        let top10;
        if(this.ranck = "global"){
            top10 = await pool.query("select * from snake_ranck order by puntos desc limit 10;");
        }else{
            top10 = await pool.query("select * from snake_ranck where date >= ? order by puntos desc limit 10;", [this.latestMonth])
        }
        if(this.userName == "guest"){
            return {status:200, message:"datos enviados", error:null, data: {top:top10[0], myPosition:{
                idUser: 0,
                userName: 'Invitado',
                puntos: 0,
                date: this.DateFormated,
                level: 0
              }
            }}
        }else{
            const myPosition = await pool.query("select * from snake_ranck where userName = ? ;", [this.userName]);
            return {status:200, message:"datos enviados", error:null, data: {top:top10[0], myPosition:myPosition[0]}}
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