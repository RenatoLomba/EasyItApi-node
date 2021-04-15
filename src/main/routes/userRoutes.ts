import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { usersController } from '../implementations/Users';

const userRoutes = Router();

userRoutes.post('/', usersController.create);
userRoutes.post('/login', usersController.login);
userRoutes.post('/token', checkTokenMiddleware.check, usersController.loginByToken);

export { userRoutes };
