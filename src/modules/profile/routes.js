import { Router } from 'express'
import { index, update } from './controllers.js'
import  {newProfile}  from './validate.js'
import { validate } from '../../middleware/validate.js'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'

const profileRoutes = Router()

profileRoutes.get('/:id', asyncWrapper(index))
profileRoutes.put('/:id', validate(newProfile), asyncWrapper(update))


export { profileRoutes }