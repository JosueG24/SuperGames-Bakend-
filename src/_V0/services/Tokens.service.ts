import jwt from "jsonwebtoken"
import {serialize} from "cookie"
import { TokenValues } from "../types";
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
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge : 1000*60*60*24,
            path : "/",
            domain:"localhost"
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
            secure: process.env.NODE_ENV === "production",
            sameSite:"none",
            maxAge : 1000*60*60*24,
            domain:"localhost", // <== revisar esto
            path : "/"
        })
    return myToken;
}