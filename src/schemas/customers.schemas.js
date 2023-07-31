import Joi from "joi";
import JoiDate from "@joi/date"

const joi = joiBase.extend(JoiDate)

export const customerSchema = joi.object({
    name: joi.string().required() ,
    phone: joi.string().min(10).max(11).pattern(/^\d+$/).required(),
    cpf: joi.string().trim().length(11).pattern(/^\d+$/).required(),
    birthday: joi.date().format(['YYYY-MM-DD']).required()
})