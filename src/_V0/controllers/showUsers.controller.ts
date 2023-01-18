import { RequestHandler } from "express";
import pool from "../../Database/Pool";

export const showAll: RequestHandler = async (req, res, next)=>{
    try {
        const [query] = await pool.query("SELECT * FROM users");
        return res.status(200).json({message:"ok", data:query, error:null})
    } catch (error) {
        return res.status(400).json({message:"Server error", data:null, error})
    }
}

export const showOne: RequestHandler = async (req, res, next)=>{
    try {
        const {name} = req.params
        const [query] = await pool.query("SELECT * FROM users where userName = ?", [name]) as any;
        return res.status(200).json({message:"ok", data:query, error:null})
        
    } catch (error) {
        return res.status(400).json({message:"Server error", data:null, error})
    }
}