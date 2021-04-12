export class AppointmentDTOResult {
  id?: string;

  'user_id': string;

  'expert_id': string;

  'service_id': string;

  date: Date;

  constructor(appointment: AppointmentDTOResult) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.expert_id = appointment.expert_id;
    this.service_id = appointment.service_id;
    this.user_id = appointment.user_id;
  }
}
