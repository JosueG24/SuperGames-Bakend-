import { Router } from "express";
import { Login, LoginGuest, logout } from "../controllers/userAuth.controller";

const userAuthRouter = Router();

userAuthRouter.post("/login",Login)
userAuthRouter.post("/login/guest",LoginGuest)
userAuthRouter.post("/logout",logout)

export default userAuthRouter;