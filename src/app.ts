import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import indexRouter_V0 from "./_V0/routes/index.routes_V0";
import indexRouter_V1 from "./_V1/routes/index.routes_V1";
import handleErrors from "./middlewares/handleErrors";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// middlewares
app.use(cookieParser());
/*
app.use(cors({
    origin: [/\.supergames-bakend-production.up.railway.app$/,"http://localhost:5173"],
    //origin:'*', 
    credentials:true
}));
*/
app.use((req, res, next)=>{
  const allowedOrigins = ["https://sp-games2.jguzman.tk/","http://localhost:4000","http://localhost:3000"]
  const origin = req.headers.origin as string
  console.log(origin)
  if(allowedOrigins.includes(origin)){
    console.log(origin+" ascepted")
    res.header("Access-Control-Allow-Origin", origin)
}
  // res.header("Access-Control-Allow-Origin",origin) //editar esta variable en railway
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Widht, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})
app.use(express.json());


// static files
app.use(express.static(__dirname+"/public"))


// Manejo de solicitudes OPTIONS
app.options('*', (req, res) => {
  res.status(200).send();
});

// routes V0
app.use("/api/V0/",indexRouter_V0);
// routes V1
app.use("/api/V1/",indexRouter_V1);

// Handle errors
app.use(handleErrors);

export default app;