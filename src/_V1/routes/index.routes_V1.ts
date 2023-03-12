import { Router } from "express";

import { pingPong } from "../../_V1/controllers/index.cont_V1";
import { newUser } from "../../_V1/controllers/newUser.cont_V1";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../../_V1/controllers/score.cont_V1";
import { Login, LoginGuest, logout, sessionValidate } from "../../_V1/controllers/userAuth.cont_V1";

const indexRouterV1 = Router();

indexRouterV1.get("/ping", pingPong)

// New User routes
indexRouterV1.post("/newUser",newUser)  // finished

// Score routes
indexRouterV1.post("/saveScore",saveScore)  //finished
indexRouterV1.post("/rancking/global",ranking_glogal)  //finishedd 
indexRouterV1.post("/rancking/mensual",ranking_mensual)  //finishedd 
indexRouterV1.post("/validateRecord",validate_record)  //finishedd

// User Auth routes
indexRouterV1.get("/sessionValidate",sessionValidate)  // finished
indexRouterV1.post("/login",Login)  // finished
indexRouterV1.post("/login/guest",LoginGuest)  // finished
indexRouterV1.post("/logout",logout)  // finished

export default indexRouterV1;