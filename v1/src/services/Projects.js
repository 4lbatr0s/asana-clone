import ProjectModel from "../models/Projects.js";
import BaseService from "../services/BaseService.js";


class ProjectService extends BaseService{
    model = ProjectModel;

    async findAll(where){
        /**
         * INFO: how it works? 
         * 1. binds Project and User objects through the "path", because we created ref on this field.
         * 2. brings user_id object with values of the related user.
         */
        return this.model.find(where || {}).populate({
            path:"user_id",
            select:"full_name email",
        })
    }
}

export default new ProjectService();