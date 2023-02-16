import express from 'express';
import schemas from "../validations/Sections.js";
import validate from "../middlewares/validate.js";
import SectionsController from "../controllers/Sections.js";
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();
router.get("/index", authenticate, SectionsController.index);
router.get("/", authenticate, SectionsController.list);
router.get("/:projectId", authenticate, SectionsController.listByProject);
router.route("/").post(authenticate, validate(schemas.createValidation), SectionsController.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), SectionsController.update);
router.route("/:id").delete(authenticate, SectionsController.remove);
router.route("/getbyid/:sectionId").get(authenticate, SectionsController.getSectionById);


export default router;