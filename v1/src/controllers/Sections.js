import httpStatus from 'http-status';
import SectionService from '../services/Sections.js';
import ProjectService from "../services/Projects.js";



class SectionsController {
    async index(req, res) {
        return res.status(httpStatus.OK).send({ message: 'sections...' });
    }

    async create(req, res) {
        req.body.user_id = req.user._id;
        try {
            const result = await SectionService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async remove(req, res) {
        try {
            const deletedSection = await SectionService.delete(req.params?.id);
            if (!deletedSection)
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ error: 'Boyle bir kayit bulunmamaktadir.' });
            console.log('deletedSection:', deletedSection);
            res.status(httpStatus.OK).send({
                message: 'Section basariyla silindi',
            });
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Section silinirken bir hata olustu.',
            });
        }
    }

    async list(req, res) {
        try {
            const result = await SectionService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async listByProject(req, res) {
        if(!req.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({error:'Proje bilgisi eksik!'});
        try {
            
            const project = await ProjectService.find(req.params.projectId);
            if(!project){
                return res.status(httpStatus.NOT_FOUND).send({error:'Bu idye sahip bir project yok'});
            }
            const result = await SectionService.listByProject({project_id:req.params.projectId});
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async getSectionById(req, res) {
        if(!req.params?.sectionId) return res.status(httpStatus.BAD_REQUEST).send({error:'Section bilgisi eksik!'});
        try {
            
            const project = await SectionService.find(req.params.sectionId);
            if(!project){
                return res.status(httpStatus.NOT_FOUND).send({error:'Bu idye sahip bir section yok'});
            }
            const result = await SectionService.find({_id:req.params.sectionId});
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }


    async update(req, res) {
        try {
            if (!req.params.id) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ message: 'ID bilgisi eksik' });
            }
            const updatedSection = await SectionService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedSection);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Kayit sirasinda bir hata olustu!',
            });
        }
    }

}

export default new SectionsController();
