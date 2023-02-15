import UserService from '../services/Users.js';
import httpStatus from 'http-status';
import Helper from '../scripts/utils/helper.js';
import messages from '../scripts/utils/messages.js';
import ProjectService from '../services/Projects.js';
import eventEmitter from '../scripts/events/eventEmitter.js';
import { request } from 'express';

class UsersController {
    async create(req, res) {
        req.body.password = Helper.passwordToHash(req.body.password);
        try {
            const result = await UserService.add(req.body);
            //TODO: do not return password.
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async list(req, res) {
        try {
            const result = await UserService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async login(req, res) {
        try {
            let user = await UserService.loginUser(req.body.email);
            if (!user)
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send({ message: messages.ERROR.USER_NOT_FOUND });
            const hashedPassword = Helper.passwordToHash(req.body.password);
            if (hashedPassword.toString() !== user.password)
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send({ message: messages.ERROR.WRONG_CREDENTIAL });
            //TIP: How to use refresh an access token when login.
            user = {
                ...user.toObject(),
                tokens: {
                    acces_token: Helper.createAccessToken(user),
                    refresh_token: Helper.createRefreshToken(user),
                },
            };
            delete user.password; //TIP: do not return password.
            return res.status(httpStatus.OK).send(user);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    /**
     *
     * @returns Projects with the user id that sent the request.
     */
    async projectList(req, res) {
        req.user?.id;
        try {
            const projects = await ProjectService.findAll({
                user_id: req.user?._id,
            });
            res.status(httpStatus.OK).send(projects);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Projeleri getirirken beklenmedik bir hata olustu.',
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const newPassword = Helper.createPassword();
            const updatedUser = await UserService.update(
                { email: req.body.email },
                { password: Helper.passwordToHash(newPassword) }
            );
            eventEmitter.emit('send_email', {
                to: updatedUser.email, // list of receivers
                subject: 'Sifre sifirlama', // Subject line
                html: `Talebiniz uzere sifre sifirlama isleminiz gereceklesmistir.</br>Giris yaptiktan sonra sifreinizi degistirmeyi unutmayin.</br>Yeni Sifreniz:${newPassword}`, // html body
            });
            res.status(httpStatus.OK).send({
                message:
                    'Sifre sifirlama islemi icin sisteme kayitli e-posta adresinize gereken bilgileri gonderdik.',
            });
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Sifre sifirlanirken bir hata ile karsilasildi.',
            });
        }
    }

    async changePassword(req,res){
        //TODO: UI'dan sonra eski-yeni sifre karsilastirmasi eklenmeli.
        req.body.password = Helper.passwordToHash(req.body?.password);
        try {
           const updatedUser = await UserService.update({_id:req.user?._id}, req.body);
           res.status(httpStatus.OK).send(updatedUser);   
        } catch (error) {
           res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error:'Sifre degisitirilirken bir hata ile karsilasildi.'});   
        }
    }

    async update(req, res) {
        // if(req.body?.password) delete req.body.password; //TIP: We don't want client to include password data to update.
        //or we can do it with reduce.
        const updateData = Object.keys(req.body).reduce(
            (objectToReturn, key) => {
                if (key !== 'password') {
                    objectToReturn[key] = req.body[key];
                }
                return objectToReturn;
            },
            {}
        );
        try {
            const updatedUser = await UserService.update(
                { _id: req.user?._id },
                updateData
            );
            res.status(httpStatus.OK).send(updatedUser);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'Kayit sirasinda bir hata olustu!',
            });
        }
    }

    async remove(req,res){
        try {
            const deletedUser = await UserService.delete(req.params?.id);
            if(!deletedUser) return res.status(httpStatus.NOT_FOUND).send({error:'Boyle bir kayit bulunmamaktadir.'});
            console.log("deletedUser:",deletedUser);
            res.status(httpStatus.OK).send({message:'User basariyla silindi'});
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error:'User silinirken bir hata olustu.'});
        }
    }
}

export default new UsersController();
