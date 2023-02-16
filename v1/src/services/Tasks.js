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
    }

}

export default new TaskService();