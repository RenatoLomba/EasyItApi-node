import { getRepository } from 'typeorm';
import Service from '../../database/models/Service';
import { ServiceEntity } from '../../entities/ServiceEntity';
import { IServiceRepository } from '../IServiceRepository';

export class ServiceRepository implements IServiceRepository {
  async selectByIdAsync(id: string): Promise<ServiceEntity> {
    const servicesRepository = getRepository(Service);
    const service = await servicesRepository.findOne({ id });
    if (!service) return null;
    return new ServiceEntity(service);
  }

  async selectByCode(code: string, expertId: string): Promise<ServiceEntity> {
    const servicesRepository = getRepository(Service);
    const service = await servicesRepository.findOne(
      { where: { code, expert_id: expertId } },
    );
    if (!service) return null;
    return new ServiceEntity(service);
  }

  async insertAsync(service: ServiceEntity): Promise<ServiceEntity> {
    const servicesRepository = getRepository(Service);
    const newService = servicesRepository.create(service);
    await servicesRepository.save(newService);
    return new ServiceEntity(newService);
  }
}
