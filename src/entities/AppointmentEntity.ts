import { ExpertEntity } from './ExpertEntity';
import { ServiceEntity } from './ServiceEntity';
import { UserEntity } from './UserEntity';

export class AppointmentEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'user_id': string;

  'expert_id': string;

  'service_id': string;

  user?: UserEntity;

  expert?: ExpertEntity;

  service?: ServiceEntity;

  date: Date;

  constructor(appointment: AppointmentEntity) {
    Object.assign(this, appointment);
  }
}
