import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { servicesController } from '../implementations/Services';

const serviceRoutes = Router();

serviceRoutes.post('/', checkTokenMiddleware.check, servicesController.create);

export { serviceRoutes };
