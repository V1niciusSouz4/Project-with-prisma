import { Router } from 'express'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'
import { loginUSER, profile } from './user.controller.js'
import { loginADM } from './admin.controller.js'
import { loginSchema } from './validation.js'
import { validate } from '../../middleware/validate.js'

const authRoutes = Router()

authRoutes.post('/login', validate(loginSchema),asyncWrapper(loginUSER))
authRoutes.post('/loginADM', validate(loginSchema),asyncWrapper(loginADM))
authRoutes.get('/profile', asyncWrapper(profile))

export { authRoutes }