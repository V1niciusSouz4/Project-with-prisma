import { Router } from 'express';
import { userRoutes } from './modules/users/routes.js';
import { adminRoutes } from './modules/admin/routes.js';
import { clientRoutes } from './modules/client/routes.js';
import { profileRoutes } from './modules/profile/routes.js';
import { postsRoutes } from './modules/posts/routes.js';
import { authRoutes } from './modules/auth/routes.js';

const routes = Router();

routes.use('/users', userRoutes)
routes.use('/admins', adminRoutes)
routes.use('/clients', clientRoutes)
routes.use('/profile', profileRoutes)
routes.use('/posts', postsRoutes)
routes.use('/auth', authRoutes)


export default routes;