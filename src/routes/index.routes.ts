import { Router } from "express";
import { pingPong } from "../controllers/index.controllers";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

export default indexRouter;