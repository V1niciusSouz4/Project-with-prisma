import { Router } from 'express'
import { index, indexById, create, deletes } from './controllers.js'
import { asyncWrapper } from '../../middleware/asyncWrapper.js'
import { validate } from '../../middleware/validate.js'
import { newClient } from './validate.js'

const clientRoutes = Router()

clientRoutes.get('/', asyncWrapper(index))
clientRoutes.get('/:id', asyncWrapper(indexById))
clientRoutes.post('/', validate(newClient), asyncWrapper(create))
clientRoutes.delete('/:id', asyncWrapper(deletes))


export { clientRoutes }