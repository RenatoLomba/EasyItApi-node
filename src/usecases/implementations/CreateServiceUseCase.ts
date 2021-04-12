import { DefaultError } from '../../adapters/errors/DefaultError';
import { ServiceEntity } from '../../entities/ServiceEntity';
import { IServiceRepository } from '../../repositories/IServiceRepository';
import { ICreateServiceDTO } from '../dtos/ICreateServiceDTO';
import { ICreateServiceUseCase } from '../ICreateServiceUseCase';

export class CreateServiceUseCase implements ICreateServiceUseCase {
  constructor(
    private serviceRepository: IServiceRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(service: ICreateServiceDTO): Promise<ServiceEntity> {
    if (service.code) {
      const serviceAlreadyExists = await this.serviceRepository
        .selectByCode(service.code, service.expert_id);
      if (serviceAlreadyExists) throw new DefaultError('Serviço com código já existente');
    }
    const newService = new ServiceEntity(service);
    const serviceCreated = await this.serviceRepository.insertAsync(newService);
    return serviceCreated;
  }
}
