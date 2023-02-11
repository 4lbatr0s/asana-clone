import express from "express";
import helmet from "helmet";
import config from "./config/index.js"
import apiRoutes from "./api-routes/index.js";

config();

const app = express();
app.use(express.json());//TIP: to use json files in the js.
app.use(helmet());//TIP: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

app.use("/projects", apiRoutes.ProjectRoutes)

app.listen(process.env.APP_PORT, ()=>{ 
    console.log("server is listening on port " + process.env.APP_PORT);
})


