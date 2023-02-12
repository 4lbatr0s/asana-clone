import express from 'express';
import schemas from "../validations/Projects.js";
import validate from "../middlewares/validate.js";
import ProjectsController from "../controllers/Projects.js";

const router = express.Router();

router.route("/").post(validate(schemas.createValidation), ProjectsController.create)//TIP: next() in the validate is ProjectsController.create
router.get("/", ProjectsController.list)

export default router;