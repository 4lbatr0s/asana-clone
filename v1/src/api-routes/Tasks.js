import express from 'express';
import schemas from "../validations/Tasks.js";
import validate from "../middlewares/validate.js";
import TasksController from "../controllers/Tasks.js";
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();
router.get("/index", authenticate, TasksController.index);
router.get("/", authenticate, TasksController.list);
router.get("/:projectId", authenticate, TasksController.listByProject);
router.route("/").post(authenticate, validate(schemas.createValidation), TasksController.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), TasksController.update);
router.route("/:id").delete(authenticate, TasksController.remove);
router.route("/:taskId/make-comment").patch(authenticate, validate(schemas.commentValidation), TasksController.makeComment);
router.route("/:taskId/:commentId").delete(authenticate, TasksController.deleteCommand);


export default router;