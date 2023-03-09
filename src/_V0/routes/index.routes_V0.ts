import { Router } from "express";

import { pingPong } from "../controllers/index.cont_V0";
import { newUser } from "../controllers/newUser.cont_V0";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../controllers/score.cont_V0";
import { showAll, showOne } from "../controllers/showUsers.cont_V0";
import { Login, LoginGuest, logout } from "../controllers/userAuth.cont_V0";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

// Show users routes
indexRouter.get("/showAll", showAll)  // finished
indexRouter.get("/showOne/:name", showOne) // finished

// New User routes
indexRouter.post("/newUser",newUser)  // finished

// Score routes
indexRouter.post("/saveScore",saveScore)  //finished
indexRouter.post("/rancking/global",ranking_glogal)  //finishedd 
indexRouter.post("/rancking/mensual",ranking_mensual)  //finishedd 
indexRouter.post("/validateRecord",validate_record)  //finishedd

// User Auth routes
indexRouter.post("/login",Login)  // finished
indexRouter.post("/login/guest",LoginGuest)  // finished
indexRouter.post("/logout",logout)  // finished

export default indexRouter;