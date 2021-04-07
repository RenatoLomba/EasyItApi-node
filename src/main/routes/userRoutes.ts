import { Router } from 'express';
import createUser from '../implementations/CreateUser';
import login from '../implementations/Login';

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.post('/login', login);

export default userRoutes;
