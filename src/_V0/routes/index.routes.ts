import { Router } from "express";

import { pingPong } from "../controllers/index.controllers";
import { newUser } from "../controllers/newUser.controller";
import { saveScore, ranking_glogal, ranking_mensual, validate_record } from "../controllers/score.controller";
import { showAll, showOne } from "../controllers/showUsers.controller";
import { Login, LoginGuest, logout } from "../controllers/userAuth.controller";

const indexRouter = Router();

indexRouter.get("/ping", pingPong)

// New User routes
indexRouter.post("/newUser",newUser)

// Score routes
indexRouter.post("/saveScore",saveScore)
indexRouter.post("/rancking/global",ranking_glogal)
indexRouter.post("/rancking/mensual",ranking_mensual)
indexRouter.post("/validate_record",validate_record)

// Show users routes
indexRouter.get("/showAll", showAll)
indexRouter.get("/showOne/:name", showOne)

// User Auth routes
indexRouter.post("/login",Login)
indexRouter.post("/login/guest",LoginGuest)
indexRouter.post("/logout",logout)

export default indexRouter;