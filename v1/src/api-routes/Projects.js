import express from 'express';
import schemas from "../validations/Projects.js";
import validate from "../middlewares/validate.js";
import ProjectsController from "../controllers/Projects.js";
import authenticate from '../middlewares/authenticate.js';
import SectionsController from "../controllers/Sections.js";
import globalErrorHandler from '../middlewares/error.js';
import idChecker from '../middlewares/idChecker.js';

const router = express.Router();

router.get("/", authenticate, ProjectsController.list)
router.route("/").post(authenticate, validate(schemas.createValidation), ProjectsController.create);
router.route("/:id").patch(idChecker(),authenticate, validate(schemas.updateValidation), ProjectsController.update);
router.route("/:id").delete(idChecker(),authenticate, ProjectsController.remove);
router.get("/:projectId", idChecker("projectId"),authenticate, ProjectsController.findById);
router.get("/:projectId/sections", idChecker("projectId"),authenticate, SectionsController.listByProject);
export default router;