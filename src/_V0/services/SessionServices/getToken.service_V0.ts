import { TokenValues, responseService } from "../../types_V0";
import { createTokenUser, createTokenGuest } from "../Tokens.service_V0";

export default class serviceHandler{

    public static create(values?:TokenValues):responseService{
        // Segun el tipo, se ejecuta una u otra función
        if(values !== undefined){
            return this.userToken(values)
        }
        if(values == undefined){
            return this.guestToken()
        }
        return serviceHandler.badRequest();
    }

    // Handlers
    private static userToken(values:TokenValues):responseService{
        // Creamos el token de usuario
        const token = createTokenUser(values)
        let res = {status: 200, message:"Ok", data:token, error:null};
        return res
    }

    private static guestToken():responseService{
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
