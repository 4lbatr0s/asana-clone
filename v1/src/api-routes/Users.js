import express from 'express';
import schemas from "../validations/Users.js";
import validate from "../middlewares/validate.js";
import UsersController from "../controllers/Users.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.route("/").post(validate(schemas.createValidation), UsersController.create);
router.get("/",authenticate, UsersController.list);
router.route("/login").post(validate(schemas.loginValidation), UsersController.login);
router.route("/").patch(authenticate, validate(schemas.updateValidation), UsersController.update);
router.route("/projects").get(authenticate, UsersController.projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), UsersController.resetPassword);
router.route("/:id").delete(authenticate, UsersController.remove);


export default router;