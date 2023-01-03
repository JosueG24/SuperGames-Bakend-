import express from "express";
import indexRouter from "./routes/index.routes";

const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// midlewares
app.use(express.json());
// routes
app.use(indexRouter)



export default app;