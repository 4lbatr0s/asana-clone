import express from 'express';
import schemas from "../validations/Users.js";
import validate from "../middlewares/validate.js";
import UsersController from "../controllers/Users.js";

const router = express.Router();

router.route("/").post(validate(schemas.createValidation), UsersController.create);
router.get("/", UsersController.list);
router.route("/login").post(validate(schemas.loginValidation), UsersController.login);

export default router;