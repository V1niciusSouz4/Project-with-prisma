import Joi from 'joi'

export const newClient = Joi.object({
  email: Joi.string().email().required(),
})