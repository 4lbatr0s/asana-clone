import Joi from "joi";

const createValidation = Joi.object({
    full_name:Joi.string().required().min(8),
    password:Joi.string().required().min(8),
    email:Joi.string().email().required().min(8),
}).unknown(true);

const loginValidation = Joi.object({
    email:Joi.string().email().required().min(8),
    password:Joi.string().required().min(8),
}).unknown(true);


export default { createValidation, loginValidation}