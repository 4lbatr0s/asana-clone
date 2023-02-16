import Joi from "joi";

const createValidation = Joi.object({
    title:Joi.string().required().min(3),
    project_id: Joi.string().required().min(8),
    section_id: Joi.string().required().min(8),
    description:Joi.string().min(8),
    assigned_to:Joi.string().min(8),
    due_date:Joi.date(),
    statuses:Joi.array(),
    order:Joi.number(),
    isCompleted:Joi.boolean(),
    comments:Joi.array(),
    media:Joi.array(),
    sub_tasks:Joi.array(),

}).unknown(true);

const updateValidation = Joi.object({
    title:Joi.string().min(3),
    project_id: Joi.string().min(8),
    section_id: Joi.string().min(8),
    description:Joi.string().min(8),
    assigned_to:Joi.string().min(8),
    statuses:Joi.array(),
    due_date:Joi.date(),
    order:Joi.number(),
    isCompleted:Joi.boolean(),
    comments:Joi.array(),
    media:Joi.array(),
    sub_tasks:Joi.array(), 
}).unknown(true);

const commentValidation = Joi.object({
    comment:Joi.string().required().min(1)
});


export default { createValidation, updateValidation, commentValidation};