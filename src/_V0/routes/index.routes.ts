import { Router } from "express";

import { pingPong } from "../controllers/index.controllers";
import { newUser } from "../controllers/newUser.controller";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../controllers/score.controller";
import { showAll, showOne } from "../controllers/showUsers.controller";
import { Login, LoginGuest, logout } from "../controllers/userAuth.controller";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

// New User routes
indexRouter.post("/newUser",newUser)  // finished --verificar

// Score routes
indexRouter.post("/saveScore",saveScore)
indexRouter.post("/rancking/global",ranking_glogal)  //finishedd --testear --verificar
indexRouter.post("/rancking/mensual",ranking_mensual)  //finishedd --testear --verificar
indexRouter.post("/validate_record",validate_record)  //finishedd --hacerPruebas --hacerEsquemas --testear --verificar

// Show users routes
indexRouter.get("/showAll", showAll)  // finished --verificar
indexRouter.get("/showOne/:name", showOne) // finished --verificar

// User Auth routes
indexRouter.post("/login",Login)  // finished --verificar
indexRouter.post("/login/guest",LoginGuest)  // finished --verificar
indexRouter.post("/logout",logout)  // finished --verificar

export default indexRouter;