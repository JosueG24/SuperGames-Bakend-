import jwt from "jsonwebtoken"
import {serialize} from "cookie"
import { TokenValues } from "../types_V1";
import dotenv from 'dotenv';
dotenv.config();

export function createTokenUser(values:TokenValues){
    let myToken;
        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
            idUser:values.idUser,
            userName: values.userName,
            email : values.email,
            password: values.password
        }, process.env.SECRET as string)
        
        myToken = serialize("myTokenName", token, {
            httpOnly: true,
            maxAge : 1000*60*60*24,
            path : "/",

            secure: true,
            sameSite:"lax",
            domain: process.env.NODE_ENV == "desarrollo"?  "localhost":"supergames-bakend-production.up.railway.app",
        })
    return myToken;
}

export function createTokenGuest(){
    let myToken;
        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
            idUser : "0",
            userName: "guest",
            email : "notDefined",
            password: "notDefined"
        }, process.env.SECRET as string)

        myToken = serialize("myTokenName", token, {
            httpOnly: true,
            maxAge : 1000*60*60*24,
            path : "/",

            secure: true,
            sameSite:"lax",
            domain: process.env.NODE_ENV == "desarrollo"?  "localhost":"supergames-bakend-production.up.railway.app",
        })
    return myToken;
}