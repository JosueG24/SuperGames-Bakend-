import express from "express";
import indexRouter from "./routes/index.routes";
import handleErrors from "./middlewares/hndleErrors";

const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// midlewares
app.use(express.json());
// routes
app.use(indexRouter)
// Handke errors
app.use(handleErrors)

export default app;