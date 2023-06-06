import Joi from 'joi'

export const newUser = Joi.object({
  name: Joi.string().trim(true).min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim(true).min(6).required(),
  profile: Joi.object()
})