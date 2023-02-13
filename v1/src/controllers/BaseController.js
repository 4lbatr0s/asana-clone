//     import httpStatus from "http-status";
//     import logger from "../scripts/logger/Users.js";
//     class BaseController {
//         constructor(service){
//             this.service = service;
//             logger.log({level: 'info', message:`service: ${this.service}`});
//         }
//         async  create(req,res){
//             try {
//                 const result = await this.service.add(req.body);
//                 res.status(httpStatus.CREATED).send(result);          
//             } catch (error) {
//                 logger.log({level: 'info', message:error.message});
//                 res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
//             }
//         }
//         async list(req,res){
//             try {
//                 const result = await this.service.findAll();
//                 res.status(httpStatus.OK).send(result);          
//             } catch (error) {
//                 res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
//             }
//         }
//     }

// export default BaseController;