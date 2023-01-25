import { Router } from "express";

import { pingPong } from "../controllers/index.controllers";
import { newUser } from "../controllers/newUser.controller";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../controllers/score.controller";
import { showAll, showOne } from "../controllers/showUsers.controller";
import { Login, LoginGuest, logout } from "../controllers/userAuth.controller";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

// New User routes
indexRouter.post("/newUser",newUser)  // finished

// Score routes
indexRouter.post("/saveScore",saveScore)  //finished
indexRouter.post("/rancking/global",ranking_glogal)  //finishedd 
indexRouter.post("/rancking/mensual",ranking_mensual)  //finishedd 
indexRouter.post("/validateRecord",validate_record)  //finishedd

// Show users routes
indexRouter.get("/showAll", showAll)  // finished
indexRouter.get("/showOne/:name", showOne) // finished

// User Auth routes
indexRouter.post("/login",Login)  // finished
indexRouter.post("/login/guest",LoginGuest)  // finished
indexRouter.post("/logout",logout)  // finished

export default indexRouter;