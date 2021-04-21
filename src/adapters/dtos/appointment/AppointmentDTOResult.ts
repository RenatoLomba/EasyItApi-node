import { AppointmentEntity } from '../../../entities/AppointmentEntity';
import { GetExpertsDTOResult } from '../expert/GetExpertsDTOResult';
import { ServiceDTOResult } from '../service/ServiceDTOResult';

export class AppointmentDTOResult {
  id?: string;

  'user_id': string;

  'expert_id': string;

  'service_id': string;

  expert?: GetExpertsDTOResult;

  service?: ServiceDTOResult;

  date: Date;

  constructor(appointment: AppointmentEntity) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.expert_id = appointment.expert_id;
    this.service_id = appointment.service_id;
    this.user_id = appointment.user_id;
    this.expert = appointment.expert && new GetExpertsDTOResult(appointment.expert);
    this.service = appointment.service && new ServiceDTOResult(appointment.service);
  }
}
