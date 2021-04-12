import { DefaultError } from '../../adapters/errors/DefaultError';
import { AppointmentEntity } from '../../entities/AppointmentEntity';
import { IAppointmentRepository } from '../../repositories/IAppointmentRepository';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IServiceRepository } from '../../repositories/IServiceRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IAppointmentDTO } from '../dtos/IAppointmentDTO';
import { ICreateAppointmentUseCase } from '../ICreateAppointmentUseCase';

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository,
    private expertRepository: IExpertRepository,
    private serviceRepository: IServiceRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(appointment: IAppointmentDTO): Promise<AppointmentEntity> {
    const appointedDate = appointment.date.getTime();
    const today = new Date().getTime();
    const difference = appointedDate - today;
    if (difference < 0) {
      throw new DefaultError('Não é possível agendar para um momento que já passou');
    }

    const user = await this.userRepository.selectByIdAsync(appointment.user_id);
    if (!user) throw new DefaultError('User not found');

    const expert = await this.expertRepository.selectByIdAsync(appointment.expert_id);
    if (!expert) throw new DefaultError('Expert not found');

    const service = await this.serviceRepository.selectByIdAsync(appointment.service_id);
    if (!service) throw new DefaultError('Service not found');

    const appointmentAlreadyExists = await this.appointmentRepository
      .selectByExpertAndUserAndService(expert.id, user.id, service.id);
    if (appointmentAlreadyExists) {
      throw new DefaultError('Usuário já realizou um agendamento deste serviço com este Expert');
    }

    const newAppointment = new AppointmentEntity(appointment);
    const appointmentCreated = await this.appointmentRepository.insertAsync(newAppointment);
    return appointmentCreated;
  }
}
