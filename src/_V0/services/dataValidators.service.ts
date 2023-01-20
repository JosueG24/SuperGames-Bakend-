// Modulos de validación multiples para los servicios de la V0

import { TokenValues } from "../types";
import axios from "axios"

//
export const newUserValidator:(data:any)=>Promise<false|TokenValues> = async (data:any)=>{
    let { userName, email, password} =  data;
    if(typeof userName !== "string" || typeof password !== "string" || typeof email !== "string"){
        return false
    }
    userName = userName.toLowerCase().trim();
    email = email.toLowerCase().trim();
    password = password.toLowerCase().trim();
    if(userName == "" || password == "" || email == ""){
        return false
    }
    
    // validar userName ==== No olvides validar si el usuario ya existe
        const result = await axios.get("http://localhost:4000/api/V0/showOne/"+userName);
        if(result.data.data.length > 0) {
            return false
        }
    // validar email
    const expEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!expEmail.test(email)){
        return false
    }  

    return { userName, email, password}
}
//
export const loginValidation:(data:{userName:string, password:string})=>Promise<false|{userName:string, password:string, email:string}> = async (data)=>{
    let {userName, password} = data;
    if(typeof userName !== "string" || typeof password !== "string"){
        return false
    }
    userName = userName.toLowerCase().trim();
    password = password.toLowerCase().trim();
    if(userName == "" || password == ""){
        return false
    }

    const result = await axios.get("http://localhost:4000/api/V0/showOne/"+userName);
    if(result.data.data.length !== 1) {
        return false
    }
    const [userData] = result.data.data;
    if(userData.password !== password){
        return false
    }
    return {userName, password,email:userData.email}
}