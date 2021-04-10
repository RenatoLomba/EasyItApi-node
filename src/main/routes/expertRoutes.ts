import { Router } from 'express';
import { expertsController } from '../implementations/Experts';

const expertRoutes = Router();

expertRoutes.post('/', expertsController.create);
expertRoutes.get('/', expertsController.get);

export { expertRoutes };
