import UserService from "../services/Users.js";
import httpStatus from "http-status";
import Helper from "../scripts/utils/helper.js";
import messages from "../scripts/utils/messages.js";

class UsersController {
    async create(req,res){
        req.body.password = Helper.passwordToHash(req.body.password);
        try {
            const result = await UserService.add(req.body);
            //TODO: do not return password.
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
    async list(req,res){
        try {
            const result = await UserService.findAll();
            res.status(httpStatus.OK).send(result);          
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
    async login(req,res){
        try {
            const user = await UserService.loginUser(req.body.email);
            if (!user)
               return res.status(httpStatus.UNAUTHORIZED).send({message:messages.ERROR.USER_NOT_FOUND});
            const hashedPassword = Helper.passwordToHash(req.body.password);
            if (hashedPassword.toString() !== user.password)
                return res.status(httpStatus.UNAUTHORIZED).send({message:messages.ERROR.WRONG_CREDENTIAL});
            return res.status(httpStatus.OK).send(user);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}

export default new UsersController();