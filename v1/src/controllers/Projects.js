import ProjectService from '../services/Projects.js';
import httpStatus from 'http-status';
class ProjectsController {
    async create(req, res) {
        req.body.user_id = req.user._id;
        try {
            const result = await ProjectService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
    async list(req, res) {
        try {
            const result = await ProjectService.findAll();
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
            const updatedProject = await ProjectService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedProject);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Kayit sirasinda bir hata olustu!',
            });
        }
    }
    async remove(req, res) {
        try {
            const deletedProject = await ProjectService.delete(req.params?.id);
            if (!deletedProject)
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ error: 'Boyle bir kayit bulunmamaktadir.' });
            console.log('deletedProject:', deletedProject);
            res.status(httpStatus.OK).send({
                message: 'Proje basariyla silindi',
            });
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Proje silinirken bir hata olustu.',
            });
        }
    }
}

// class ProjectsController extends BaseController{
// constructor(){
// console.log('ProjectService:', ProjectService);
// super(ProjectService);
// }
// }

export default new ProjectsController();
