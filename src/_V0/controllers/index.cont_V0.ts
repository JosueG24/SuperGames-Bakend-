import { RequestHandler, ErrorRequestHandler } from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export const pingPong : RequestHandler =(req, res, next)=>{
    return res.json({message:"pong"})
}