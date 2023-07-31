import JoiBase from "joi";
import JoiDate from "@joi/date"

const Joi = JoiBase.extend(JoiDate)

export const customerSchema = Joi.object({
    name: Joi.string().required() ,
    phone: Joi.string().min(10).max(11).pattern(/^\d+$/).required(),
    cpf: Joi.string().trim().length(11).pattern(/^\d+$/).required(),
    birthday: Joi.date().format(['YYYY-MM-DD']).required()
})