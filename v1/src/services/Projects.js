import ProjectModel from "../models/Projects.js";
import BaseService from "../services/BaseService.js";


class ProjectService extends BaseService{
    model = ProjectModel;
}

export default new ProjectService();