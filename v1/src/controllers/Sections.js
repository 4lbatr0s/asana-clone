import httpStatus from 'http-status';
import SectionService from '../services/Sections.js';
import ProjectService from "../services/Projects.js";
import globalErrorHandler from '../middlewares/error.js';
import ApiError from '../errors/ApiError.js';
import ApiNotFoundError from '../errors/ApiNotFoundError.js';



class SectionsController {
    async index(req, res) {
        return res.status(httpStatus.OK).send({ message: 'sections...' });
    }

    async create(req, res, next) {
        req.body.user_id = req.user._id;
        try {
            const result = await SectionService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async remove(req, res, next) {
        try {
            const deletedSection = await SectionService.delete(req.params?.id);
            if (!deletedSection)
                return next(new ApiNotFoundError());
            res.status(httpStatus.OK).send({
                message: 'Section successfully deleted',
            });
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async list(req, res, next) {
        try {
            const result = await SectionService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async listByProject(req, res, next) {
        try {
            
            const project = await ProjectService.find(req.params.projectId);
            if(!project){
                return next(new ApiNotFoundError());
            }
            const result = await SectionService.listByProject({project_id:req.params.projectId});
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

    async getSectionById(req, res, next) {
        if(!req.params?.sectionId) return res.status(httpStatus.BAD_REQUEST).send({error:'Section bilgisi eksik!'});
        try {
            
            const project = await SectionService.find(req.params.sectionId);
            if(!project){
                return next(new ApiNotFoundError());
            }
            const result = await SectionService.find({_id:req.params.sectionId});
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }


    async update(req, res, next) {
        try {
            const updatedSection = await SectionService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedSection);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));                                    
        }
    }

}

export default new SectionsController();
