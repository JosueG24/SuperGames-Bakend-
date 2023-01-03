import { Router } from "express";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../controllers/score.controller";

const scoreRouter = Router();

scoreRouter.post("/saveScore",saveScore)
scoreRouter.post("/rancking/global",ranking_glogal)
scoreRouter.post("/rancking/mensual",ranking_mensual)
scoreRouter.post("/validate_record",validate_record)

export default scoreRouter;