import express from "express";
import cors from "cors"
import "../config.env.ts"

// routes V0
import indexRouter_V0 from "./_V0/routes/index.routes";
// routes V1

// other
import handleErrors from "./middlewares/handleErrors";


const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// middlewares
app.use(cors());
app.use(express.json());

// routes V0
app.use("/api/V0/",indexRouter_V0);

// routes V1


// Handle errors
app.use(handleErrors);

export default app;