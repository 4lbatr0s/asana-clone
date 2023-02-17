import httpStatus from 'http-status';
import TaskService from '../services/Tasks.js';
import ProjectService from '../services/Projects.js';
import globalErrorHandler from "../middlewares/error.js";

class TasksController {
    async index(req, res) {
        return res.status(httpStatus.OK).send({ message: 'sections...' });
    }

    async create(req, res) {
        req.body.user_id = req.user._id;
        try {
            const result = await TaskService.add(req.body);
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async remove(req, res) {
        try {
            const deletedTask = await TaskService.delete(req.params?.id);
            if (!deletedTask)
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ error: 'Boyle bir kayit bulunmamaktadir.' });
            console.log('deletedTask:', deletedTask);
            res.status(httpStatus.OK).send({
                message: 'Task basariyla silindi',
            });
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Task silinirken bir hata olustu.',
            });
        }
    }

    async list(req, res) {
        try {
            const result = await TaskService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async listByProject(req, res) {
        if (!req.params?.projectId)
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ error: 'Proje bilgisi eksik!' });
        try {
            const project = await ProjectService.find(req.params.projectId);
            if (!project) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ error: 'Bu idye sahip bir project yok' });
            }
            const result = await TaskService.listByProject({
                project_id: req.params.projectId,
            });
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async listBySection(req, res) {
        if (!req.params?.projectId)
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ error: 'Proje bilgisi eksik!' });
        try {
            const project = await ProjectService.find(req.params.projectId);
            if (!project) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ error: 'Bu idye sahip bir project yok' });
            }
            const result = await TaskService.listByProject({
                project_id: req.params.projectId,
            });
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
            const updatedTask = await TaskService.update(
                req.params.id,
                req.body
            );
            res.status(httpStatus.OK).send(updatedTask);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Kayit sirasinda bir hata olustu!',
            });
        }
    }

    async makeComment(req, res) {
        try {
            const updatedTask = await TaskService.makeComment(req,res);
            return res.status(httpStatus.OK).send(updatedTask);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Kayit sirasinda bir hata olustu!',
            });
        }
    }

    async deleteCommand(req, res) {
        try {
            await TaskService.deleteComment(req,res);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Yorum silme sirasinda bir hata olustu!',
            });
        }
    }

    async addSubTask(req,res){
        try {
            const result = await TaskService.addSubTask(req,res,globalErrorHandler)
        } catch (error) {
            
        }
    }
}

export default new TasksController();
