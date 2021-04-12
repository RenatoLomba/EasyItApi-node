import { getRepository } from 'typeorm';
import { Appointment } from '../../database/models/Appointment';
import { AppointmentEntity } from '../../entities/AppointmentEntity';
import { IAppointmentRepository } from '../IAppointmentRepository';

export class AppointmentRepository implements IAppointmentRepository {
  async selectByExpertAndUserAndService(
    expertId: string, userId: string, serviceId: string,
  ): Promise<AppointmentEntity> {
    const appRepo = getRepository(Appointment);
    const appointment = await appRepo.findOne({
      where:
      {
        expert_id: expertId,
        user_id: userId,
        service_id: serviceId,
      },
    });
    if (!appointment) return null;
    return new AppointmentEntity(appointment);
  }

  async insertAsync(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const appRepo = getRepository(Appointment);
    const appointmentCreated = await appRepo.create(appointment);
    await appRepo.save(appointmentCreated);
    return new AppointmentEntity(appointmentCreated);
  }

  async deleteAsync(id: string): Promise<boolean> {
    const appRepo = getRepository(Appointment);
    const appointment = await appRepo.findOne(id);
    if (!appointment) return false;
    await appRepo.remove(appointment);
    return true;
  }
}
