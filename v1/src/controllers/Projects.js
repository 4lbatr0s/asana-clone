import ProjectService from "../services/Projects.js";
import httpStatus from "http-status";

class ProjectsController {
    async create(req,res){
        try {
            const result = await ProjectService.add(req.body);
            res.status(httpStatus.CREATED).send(result);          
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
    async list(req,res){
        try {
            const result = await ProjectService.findAll();
            res.status(httpStatus.OK).send(result);          
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}

export default new ProjectsController();