import express from "express";

// routes V0
import indexRouter_V0 from "./_V0/routes/index.routes";
import showUsersRoputer_V0 from "./_V0/routes/showUsers.routes";
import userAuthRouter_V0 from "./_V0/routes/userAuth.routes";
import newUserRouter_V0 from "./_V0/routes/newUser.routes";
import scoreRouter_V0 from "./_V0/routes/score.routes";

// routes V1

import handleErrors from "./middlewares/hndleErrors";

const port = process.env.PORT || 4000

const app = express();
app.set("port", port);

// midlewares
app.use(express.json());

// routes V0
app.use("/api/V0/",indexRouter_V0);
app.use("/api/V0/",showUsersRoputer_V0);
app.use("/api/V0/",userAuthRouter_V0);
app.use("/api/V0/",newUserRouter_V0);
app.use("/api/V0/",scoreRouter_V0)

// routes V1


// Handke errors
app.use(handleErrors);

export default app;