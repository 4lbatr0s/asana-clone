import ProjectService from '../services/Projects.js';
import httpStatus from 'http-status';
import globalErrorHandler from '../middlewares/error.js';
import ApiError from '../errors/ApiError.js';
import ApiNotFoundError from '../errors/ApiNotFoundError.js';
class ProjectsController {
    async create(req, res, next) {
        req.body.user_id = req.user._id;
        try {
            const result = await ProjectService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }
    async list(req, res,next) {
        try {
            const result = await ProjectService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async update(req, res, next) {
        try {
            const updatedProject = await ProjectService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedProject);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }
    async remove(req, res,next) {
        try {
            const deletedProject = await ProjectService.delete(req.params?.id);
            if (!deletedProject)
                return next(new ApiNotFoundError());
            res.status(httpStatus.OK).send({
                message: 'Project deleted successfully',
            });
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async findById(req,res,next){
        try {
            const project = await ProjectService.find(req.params.projectId);
            if(!project) return next(new ApiNotFoundError());
            return res.status(httpStatus.OK).send(project);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    };
}

export default new ProjectsController();
