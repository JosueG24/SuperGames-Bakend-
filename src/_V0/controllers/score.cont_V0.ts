import { RequestHandler } from "express";

import ranckingsService from "../services/ScoreServices/ranckings.service_V0";

export const ranking_glogal : RequestHandler = async(req, res, next)=>{
    try {
        const {mode} = req.body;

        const service = new ranckingsService({mode:mode})
        const playService = await service.master()
        return res.status(playService.status).json({message:playService.message, error:playService.error, data:playService.data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error", error:error, data:null})
    }
}