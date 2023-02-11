import ProjectService from "../services/Projects.js";
import httpStatus from "http-status";

class ProjectsController {
    async create(req,res){
        try {
            const result = await ProjectService.add({name:"Project Example"});
            res.status(httpStatus.CREATED).send(result);          
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}

export default new ProjectsController();