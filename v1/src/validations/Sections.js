import Joi from "joi";

const createValidation = Joi.object({
    name:Joi.string().required().min(3),
    project_id: Joi.string().required().min(8)
}).unknown(true);

const updateValidation = Joi.object({
    name:Joi.string().min(3),
    project_id: Joi.string().min(8)
}).unknown(true);


export default { createValidation, updateValidation};