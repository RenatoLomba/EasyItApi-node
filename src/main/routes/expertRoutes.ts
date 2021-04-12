import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { expertsController } from '../implementations/Experts';

const expertRoutes = Router();

expertRoutes.post('/', expertsController.create);
expertRoutes.get('/', expertsController.get);
expertRoutes.get('/:id', expertsController.show);

export { expertRoutes };
