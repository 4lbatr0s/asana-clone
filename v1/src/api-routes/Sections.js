import express from 'express';
import schemas from "../validations/Sections.js";
import validate from "../middlewares/validate.js";
import SectionsController from "../controllers/Sections.js";
import authenticate from '../middlewares/authenticate.js';
import idChecker from '../middlewares/idChecker.js';

const router = express.Router();
router.get("/index", authenticate, SectionsController.index);
router.get("/", authenticate, SectionsController.list);
router.get("/:projectId", idChecker('projectId'), authenticate, SectionsController.listByProject);
router.route("/").post(authenticate, validate(schemas.createValidation), SectionsController.create);
router.route("/:id").patch(idChecker('projectId'), authenticate, validate(schemas.updateValidation), SectionsController.update);
router.route("/:id").delete(idChecker('projectId'), authenticate, SectionsController.remove);
router.route("/getbyid/:sectionId").get(idChecker('sectionId'), authenticate, SectionsController.getSectionById);


export default router;