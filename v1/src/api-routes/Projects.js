import express from 'express';
import schemas from "../validations/Projects.js";
import validate from "../middlewares/validate.js";
import ProjectsController from "../controllers/Projects.js";
import authenticate from '../middlewares/authenticate.js';
const router = express.Router();

router.get("/", authenticate, ProjectsController.list)
router.route("/").post(authenticate, validate(schemas.createValidation), ProjectsController.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), ProjectsController.update);
export default router;