import { AppointmentController } from '../../adapters/controllers/AppointmentsController';
import { AppointmentRepository } from '../../repositories/implementations/AppointmentRepository';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { ServiceRepository } from '../../repositories/implementations/ServiceRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateAppointmentUseCase } from '../../usecases/implementations/CreateAppointmentUseCase';

const appointmentRepository = new AppointmentRepository();
const expertRepository = new ExpertRepository();
const userRepository = new UserRepository();
const serviceRepository = new ServiceRepository();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository, userRepository, expertRepository, serviceRepository,
);

const appointmentController = new AppointmentController(createAppointmentUseCase);

export { appointmentController };
