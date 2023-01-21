import jwt from "jsonwebtoken"
import {serialize} from "cookie"
import { TokenValues } from "../types";

export function createTokenUser(values:TokenValues){
    let myToken;

        let token = jwt.sign({
            exp: Math.floor(Date.now()/1000)+(60*60*24*1),
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
        }, process.env.SECRET as string)

        myToken = serialize("myTokenName", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge : 1000*60*60*24,
            domain:"localhost",
            path : "/"
        })
    return myToken;
}