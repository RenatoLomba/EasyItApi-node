import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { servicesController } from '../implementations/Services';

const serviceRoutes = Router();

serviceRoutes.post('/', servicesController.create);

export { serviceRoutes };
