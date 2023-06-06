import Joi from 'joi'

export const newProfile = Joi.object({
  bio: Joi.string()
})