import SectionModel from "../models/Sections.js";
import BaseService from "../services/BaseService.js";


class SectionService extends BaseService{
    model = SectionModel;

    //INFO: HOW TO POPULATE MULTIPLE PATHS
    async findAll(where){
        return this.model.find(where || {}).populate({
            path:"user_id",
            select:"full_name email profile_image",
        }).populate({
            path:"project_id",
            select:"name"
        })
    }
}

export default new SectionService();