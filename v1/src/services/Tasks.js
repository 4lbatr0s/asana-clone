import { request } from "express";
import httpStatus from "http-status";
import TaskModel from "../models/Tasks.js";
import BaseService from "../services/BaseService.js";


class TaskService extends BaseService{
    model = TaskModel;

    async makeComment(reqValues,resValues){
        const task = await this.find(reqValues.params.taskId);
        if(!task) return resValues.status(httpStatus.NOT_FOUND).send({error:'Verilen id ile eslesen bir task yok.'});
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
            if(!task) return resValues.status(httpStatus.NOT_FOUND).send({error:'Verilen id ile eslesen bir task yok.'});
            //INFO: HOW TO USE PULL IN MONGODB!
            //TIP: here we can filter comments, take comments with different id from the req.params.commentId, then updating db but PULL IS MORE PERFORMANCE DRIVEN. 
            const updatedValue = await this.update(
                { _id: reqValues.params.taskId }, // replace taskId with the task id you want to update
                { $pull: { comments: { _id: reqValues.params.commentId } } },
              );
            return resValues.status(httpStatus.OK).send(updatedValue);                
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Yorum silme sirasinda bir hata olustu!',
            });
        }
    };

    async addSubTask(req,res, next){
        if(!req.params.taskId) return res.status(httpStatus.BAD_REQUEST).send({error:'Task id is required'});
        try {
            const mainTask = await this.find(req.params.taskId);
            if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({error:'Task not found'});
            req.body.user_id = req.user._id;
            const subTask = await this.add(req.body.user);
            mainTask.sub_tasks.push(subTask); //TIP: It will only take the Object id of the subTask! thanks the way we created task model.
            mainTask.save();
            return mainTask;
        } catch (error) {
            return next(error);
        }
    };
    
}

export default new TaskService();