import { Router } from "express";
import { newUser } from "../controllers/newUser.controller";

const newUserRouter = Router();

newUserRouter.post("/newUser",newUser)

export default newUserRouter;