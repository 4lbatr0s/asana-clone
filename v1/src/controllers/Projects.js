import ProjectService from "../services/Projects.js";

const create  = (req,res)=> {
    ProjectService.insert({name:"123",lname:"2341241"});
    res.status(200).send("Project CREATE!");
}

export default {create,}