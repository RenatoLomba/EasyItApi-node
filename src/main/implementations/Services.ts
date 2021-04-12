import { ServicesController } from '../../adapters/controllers/ServicesController';
import { ServiceRepository } from '../../repositories/implementations/ServiceRepository';
import { CreateServiceUseCase } from '../../usecases/implementations/CreateServiceUseCase';

const serviceRepository = new ServiceRepository();

const createServiceUseCase = new CreateServiceUseCase(serviceRepository);

const servicesController = new ServicesController(createServiceUseCase);

export { servicesController };
