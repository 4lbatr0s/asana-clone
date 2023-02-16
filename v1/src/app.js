import express from "express";
import helmet from "helmet";
import config from "./config/index.js"
import loaders from "./loaders/index.js";
import apiRoutes from "./api-routes/index.js";
import events from "./scripts/events/index.js";
import fileUpload from "express-fileupload";
import path from 'path';
import { fileURLToPath } from "url";
import loadRoutes from "./api-routes/index.js";

const __filename = fileURLToPath(import.meta.url);//get all name
const __dirname = path.dirname(__filename); //get dir name from it.

config();
loaders();  
events(); //TIP: includes events.on's, on's should come before emits(they're in controllers) therefore it should be here.

const app = express();
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')));
app.use(express.json());//TIP: to use json files in the js.
app.use(helmet());//TIP: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(fileUpload()); //TIP:When you upload a file, the file will be accessible from req.files.

loadRoutes(app); //import route usings from another module.

app.listen(process.env.APP_PORT, ()=>{ 
    console.log("server is listening on port " + process.env.APP_PORT);
})


