import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { appointmentController } from '../implementations/Appointment';

const appointmentRoutes = Router();

appointmentRoutes.post('/', appointmentController.create);

export { appointmentRoutes };
