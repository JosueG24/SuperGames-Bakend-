// Modulos de validación multiples para los servicios de la V0

import { TokenValues } from "../types";
import axios from "axios"

export const newUserValidator:(data:any)=>Promise<false|TokenValues> = async (data:any)=>{
    let { nameUser, email, password} =  data;
    if(nameUser == "" || password == "" || email == ""){
        return false
    }
    nameUser = nameUser.toLowerCase().trim();
    email = email.toLowerCase().trim();
    password = password.toLowerCase().trim();
    
    // validar nameUser ==== No olvides validar si el usuario ya existe
        const result = await axios.get("http://localhost:4000/api/V0/showOne/"+nameUser);
        if(result.data.data.length > 0) {
            return false
        }
    // validar email
    const expEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!expEmail.test(email)){
        return false
    }  

    return { nameUser, email, password}
}