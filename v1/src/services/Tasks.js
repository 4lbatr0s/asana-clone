import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";
import ApiNotFoundError from "../errors/ApiNotFoundError.js";
import globalErrorHandler from "../middlewares/error.js";
import TaskModel from "../models/Tasks.js";
import BaseService from "../services/BaseService.js";


class TaskService extends BaseService{
    model = TaskModel;

    //TIP: override method.
    //INFO: HOW TO USE POPULATE WITH EXPAND!
    async find(itemId=1, expand=false){
        if(!expand)
            return await this.model.findById(itemId);
        return await this.model.findById(itemId)
        .populate({
            path:"user_id",
            select:"full_name email profile_image"
        })
        .populate({
            path:"comments",
            populate:{  //INFO: HOW TO NESTED POPULATE THE OBJECTS!
                path:"user_id",
                select:"full_name email profile_image"
            }
        })
        .populate({
            path:"sub_tasks",
            select:"title description isCompleted assigned_to due_date order subtasks statuses"
        })
    }

    async makeComment(reqValues, resValues, next){
        const task = await this.find(reqValues.params.taskId);
        if(!task) throw new ApiNotFoundError();
        const comment = {
            ...reqValues.body,
            commented_at:new Date(),
            user_id:reqValues.user._id,
        }
        task.comments.push(comment);
        await task.save();
        return task;
    }
    
    async deleteComment(reqValues,resValues){
        try {
            const task = await this.find(reqValues.params.taskId);
            if(!task) throw new ApiNotFoundError();
            //INFO: HOW TO USE PULL IN MONGODB!
            //TIP: here we can filter comments, take comments with different id from the req.params.commentId, then updating db but PULL IS MORE PERFORMANCE DRIVEN. 
            const updatedValue = await this.update(
                { _id: reqValues.params.taskId }, // replace taskId with the task id you want to update
                { $pull: { comments: { _id: reqValues.params.commentId } } },
              );
            return resValues.status(httpStatus.OK).send(updatedValue);                
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);                                    
        }
    };

    async addSubTask(req,res, next){
        try {
            const mainTask = await this.find(req.params.taskId);
            if(!mainTask) throw new ApiNotFoundError();
            req.body.user_id = req.user._id;
            const subTask = await this.add(req.body);
            mainTask.sub_tasks.push(subTask); //TIP: It will only take the Object id of the subTask! thanks the way we created task model.
            mainTask.save();
            return mainTask;
        } catch (error) {
            throw new ApiError(error?.message,error?.statusCode);
        }
    };

    async getTask(req,res){
        try {
            const mainTask = await this.find(req.params.taskId, true);
            if(!mainTask) throw new ApiNotFoundError();
            return mainTask;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);                                    
        }
    }
}

export default new TaskService();