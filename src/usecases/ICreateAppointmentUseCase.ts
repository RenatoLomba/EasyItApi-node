import { AppointmentEntity } from '../entities/AppointmentEntity';
import { IAppointmentDTO } from './dtos/IAppointmentDTO';

export interface ICreateAppointmentUseCase {
  execute(appointment: IAppointmentDTO): Promise<AppointmentEntity>;
}
