import { TokenValues, responseService } from "../../types";
import { createTokenUser, createTokenGuest } from "../Tokens.service";

export default class serviceHandler{
    values: TokenValues;
    type : "user"|"guest";

    constructor(type : "user"|"guest",values:TokenValues){
        // Inicializamos el objeto y almacenamos sus propiedades
        this.values = values;
        this.type = type;
    }

    public create():responseService{
        // Segun el tipo, se ejecuta una u otra función
        if(this.type == "user"){
            return this.userToken()
        }
        if(this.type == "guest"){
            return this.guestToken()
        }
        return serviceHandler.badRequest();
    }

    // Handlers
    private userToken():responseService{
        // Creamos el token de usuario
        const token = createTokenUser(this.values)
        let res = {status: 200, message:"Ok", data:token, error:null};
        return res
    }

    private guestToken():responseService{
        // creamos el token de invitados
        const token = createTokenGuest()
        let res = {status: 200, message:"Ok", data:token, error:null};
        return res
    }
    // Error handlers
    private static serverError(error:any):responseService{
        let res = {status: 500, message:"ha ocurrido un error inesperado, asegurese de tener coneccion a interet.",data:null, error};
        return res;
    }
    private static badRequest():responseService{
        let res = {status: 400, message:"Mala peticion", data:null, error:"bad request"};
        return res;
    }
}










export async function createNweUser(type : object, values:object){
    let myToken;

}