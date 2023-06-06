import { Router } from 'express'
import { index, indexById, create, update, deletes } from './controllers.js'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'
import { isAuthenticatedUSER } from '../../middleware/isAuthenticated.js'
import { newUser } from './validate.js'
import { validate } from '../../middleware/validate.js'

const userRoutes = Router()

userRoutes.get('/', asyncWrapper(index))
userRoutes.get('/:id', asyncWrapper(indexById))
userRoutes.post('/', validate(newUser) ,asyncWrapper(create))
userRoutes.put('/:id', validate(newUser), isAuthenticatedUSER, asyncWrapper(update))
userRoutes.delete('/:id', asyncWrapper(deletes))


export { userRoutes }