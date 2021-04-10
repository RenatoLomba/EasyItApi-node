import { Router } from 'express';
import { usersController } from '../implementations/Users';

const userRoutes = Router();

userRoutes.post('/', usersController.create);
userRoutes.post('/login', usersController.login);

export { userRoutes };
