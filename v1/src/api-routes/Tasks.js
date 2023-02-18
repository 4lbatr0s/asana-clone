import express from 'express';
import schemas from "../validations/Tasks.js";
import validate from "../middlewares/validate.js";
import TasksController from "../controllers/Tasks.js";
import authenticate from '../middlewares/authenticate.js';
import globalErrorHandler from '../middlewares/error.js';
import idChecker from '../middlewares/idChecker.js';

const router = express.Router();

router.get("/index", authenticate, TasksController.index);
router.get("/", authenticate, TasksController.list);
router.get("/:projects/projectId", idChecker('projectId'), authenticate, TasksController.listByProject);
router.route("/").post(authenticate, validate(schemas.createValidation), TasksController.create);
router.route("/:taskId/add-sub-task").post(idChecker('taskId'), authenticate, validate(schemas.createValidation), TasksController.addSubTask, globalErrorHandler);
router.route("/:id").patch(idChecker(), authenticate, validate(schemas.updateValidation), TasksController.update);
router.route("/:taskId/make-comment").patch(idChecker('taskId'), authenticate, validate(schemas.commentValidation), TasksController.makeComment);
router.route("/:id").delete(idChecker(), authenticate, TasksController.remove);
router.route("/:taskId/:commentId").delete(idChecker('taskId', 'projectId'),authenticate, TasksController.deleteCommand);
router.get("/:taskId", idChecker('taskId'), authenticate, TasksController.getTask, globalErrorHandler);



export default router;