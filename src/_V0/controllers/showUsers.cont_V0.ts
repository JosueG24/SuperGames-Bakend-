import { RequestHandler } from "express";
import pool from "../../Database/Pool";

export const showAll: RequestHandler = async (req, res, next)=>{
    try {
        const [query] = await pool.query("SELECT idUser, userName, REPEAT('*', CHAR_LENGTH(password)) as password FROM users;");
        return res.status(200).json({message:"ok", data:query, error:null})
    } catch (error) {
        return res.status(400).json({message:"Server error", data:null, error})
    }
}