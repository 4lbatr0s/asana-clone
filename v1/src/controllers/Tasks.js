import httpStatus from 'http-status';
import TaskService from '../services/Tasks.js';
import ProjectService from '../services/Projects.js';
import ApiError from '../errors/ApiError.js';
import ApiNotFoundError from '../errors/ApiNotFoundError.js';

class TasksController {
    async index(req, res) {
        return res.status(httpStatus.OK).send({ message: 'sections...' });
    }

    async create(req, res, next) {
        req.body.user_id = req.user._id;
        try {
            const result = await TaskService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            return next(new ApiError(`An error occurred while creating the task`, httpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    async remove(req, res,next) {
        try {
            const deletedTask = await TaskService.delete(req.params?.id);
            if (!deletedTask)
                return next(new ApiNotFoundError());
            res.status(httpStatus.OK).send({
                message: 'Task basariyla silindi',
            });
        } catch (error) {
            return next(new ApiError(`An error occurred while deleting the task`, httpStatus.INTERNAL_SERVER_ERROR));        
        }
    }

    async list(req, res) {
        try {
            const result = await TaskService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(`An error occurred while fetching the tasks`, httpStatus.INTERNAL_SERVER_ERROR));        
        }
    }

    async listByProject(req, res, next) {
        try {
            const project = await ProjectService.find(req.params.projectId);
            if (!project) {
                return next(new ApiNotFoundError());
            }
            const result = await TaskService.listByProject({
                project_id: req.params.projectId,
            });
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                
        }
    }

    async listBySection(req, res, next) {
        try {
            const project = await ProjectService.find(req.params.projectId);
            if (!project) {
                return next(new ApiNotFoundError());
            }
            const result = await TaskService.listByProject({
                project_id: req.params.projectId,
            });
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                
        }
    }

    async update(req, res, next) {
        try {
            const updatedTask = await TaskService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedTask);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async makeComment(req, res, next) {
        try {
            const updatedTask = await TaskService.makeComment(req,res);
            return res.status(httpStatus.OK).send(updatedTask);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode))
        }
    }

    async deleteCommand(req, res, next) {
        try {
            await TaskService.deleteComment(req,res);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async addSubTask(req,res, next){
        try {
            const result = await TaskService.addSubTask(req,res,new ApiError);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                                                        
        }
    }

    async getTask(req,res, next){
        try {
            const result = await TaskService.getTask(req);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }
}

export default new TasksController();
