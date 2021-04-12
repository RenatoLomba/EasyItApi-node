import { AppointmentEntity } from '../entities/AppointmentEntity';

export interface IAppointmentRepository {
  insertAsync(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  deleteAsync(id: string): Promise<boolean>;
  selectByExpertAndUserAndService(
    expertId: string, userId: string, serviceId: string
  ): Promise<AppointmentEntity>;
}
