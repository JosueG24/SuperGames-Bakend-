import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import "../config.env.ts"
import indexRouter_V0 from "./_V0/routes/index.routes";
import handleErrors from "./middlewares/handleErrors";

const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// middlewares
app.use(cookieParser());
app.use(cors({
     origin: ['http://localhost:3000',"http://localhost:5173"],
    //origin:'*', 
   credentials:true
  }));
app.use(express.json());

// routes V0
app.use("/api/V0/",indexRouter_V0);

// routes V1


// Handle errors
app.use(handleErrors);

export default app;