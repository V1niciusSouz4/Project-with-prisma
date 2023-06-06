import { Router } from 'express'
import { index, indexById, create, update, deletes } from './controllers.js'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'
import { isAuthenticatedADMIN } from '../../middleware/isAuthenticated.js'
import { validate } from '../../middleware/validate.js'
import { newAdmin } from './validate.js'

const adminRoutes = Router()

adminRoutes.get('/', asyncWrapper(index))
adminRoutes.get('/:id', asyncWrapper(indexById))
adminRoutes.post('/',validate(newAdmin),  asyncWrapper(create))
adminRoutes.put('/:id',validate(newAdmin), isAuthenticatedADMIN, asyncWrapper(update))
adminRoutes.delete('/:id',isAuthenticatedADMIN, asyncWrapper(deletes))


export { adminRoutes }