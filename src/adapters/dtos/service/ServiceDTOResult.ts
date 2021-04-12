import { ServiceEntity } from '../../../entities/ServiceEntity';

export class ServiceDTOResult {
  id: string;

  'expert_id': string;

  name: string;

  code: string;

  description: string;

  price: number;

  constructor(service: ServiceEntity) {
    this.id = service.id;
    this.name = service.name;
    this.expert_id = service.expert_id;
    this.code = service.code;
    this.description = service.description;
    this.price = service.price;
  }
}
