//validation
//validate middleware.

import express from 'express';
import ProjectsController from "../controllers/Projects.js";
const router = express.Router();


router.post("/", ProjectsController.create)

export default router;