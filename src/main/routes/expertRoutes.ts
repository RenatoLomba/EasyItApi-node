import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { expertsController } from '../implementations/Experts';

const expertRoutes = Router();

expertRoutes.post('/', checkTokenMiddleware.check, expertsController.create);
expertRoutes.get('/', checkTokenMiddleware.check, expertsController.get);
expertRoutes.get('/:id', checkTokenMiddleware.check, expertsController.show);
expertRoutes.get('/services/:name', checkTokenMiddleware.check, expertsController.getByServiceName);

export { expertRoutes };
