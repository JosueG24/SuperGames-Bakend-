import { Router } from "express";

import { pingPong } from "../controllers/index.cont_V0";

import { ranking_glogal } from "../controllers/score.cont_V0";
import { showAll } from "../controllers/showUsers.cont_V0";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

// Show users routes
indexRouter.get("/showAll", showAll)  // finished

// Score routes
indexRouter.post("/rancking/global",ranking_glogal)  //finishedd 


export default indexRouter;