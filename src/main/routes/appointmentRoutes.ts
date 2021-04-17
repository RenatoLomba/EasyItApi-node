import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { appointmentController } from '../implementations/Appointment';

const appointmentRoutes = Router();

appointmentRoutes.post('/', checkTokenMiddleware.check, appointmentController.create);
appointmentRoutes.delete('/:id', checkTokenMiddleware.check, appointmentController.delete);

export { appointmentRoutes };
