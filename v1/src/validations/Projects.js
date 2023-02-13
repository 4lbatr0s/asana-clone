import Joi from "joi";

//INFO: HOW TO CREATE  A VALIDATION WITH JOI
const createValidation = Joi.object({
    name:Joi.string().required().min(5),
}).unknown(true);


export default { createValidation,}