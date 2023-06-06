import { Router } from 'express'
import { index, indexById, create, update, deletes } from './controllers.js'
import { isAuthenticatedUSER, isAuthenticatedADMIN } from '../../middleware/isAuthenticated.js'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'
const postsRoutes = Router()

postsRoutes.get('/', asyncWrapper(index))
postsRoutes.get('/:id', asyncWrapper(indexById))
postsRoutes.post('/:id', isAuthenticatedUSER, asyncWrapper(create))
postsRoutes.put('/:id', isAuthenticatedADMIN, asyncWrapper(update))
postsRoutes.delete('/:id', isAuthenticatedUSER, asyncWrapper(deletes))


export { postsRoutes }