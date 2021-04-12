import { ServiceEntity } from '../entities/ServiceEntity';
import { ICreateServiceDTO } from './dtos/ICreateServiceDTO';

export interface ICreateServiceUseCase {
  execute(service: ICreateServiceDTO): Promise<ServiceEntity>;
}
