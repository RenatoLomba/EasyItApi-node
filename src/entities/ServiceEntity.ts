export class ServiceEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'expert_id': string;

  name: string;

  code?: string;

  description?: string;

  price: number;

  constructor(service: ServiceEntity) {
    Object.assign(this, service);
  }
}
