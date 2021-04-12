import { ServiceEntity } from '../entities/ServiceEntity';

export interface IServiceRepository {
  insertAsync(service: ServiceEntity): Promise<ServiceEntity>;
  selectByCode(code: string, expertId: string): Promise<ServiceEntity>;
  selectByIdAsync(id: string): Promise<ServiceEntity>;
}
