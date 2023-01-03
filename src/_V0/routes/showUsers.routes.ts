import { Router } from "express";
import { showAll, showOne } from "../controllers/showUsers.controller";

const showUsersRoputer = Router();

showUsersRoputer.get("/showAll", showAll)
showUsersRoputer.get("/showOne/:name", showOne)


export default showUsersRoputer;