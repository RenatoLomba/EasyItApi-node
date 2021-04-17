import { DefaultError } from '../../adapters/errors/DefaultError';
import { IAppointmentRepository } from '../../repositories/IAppointmentRepository';
import { IDeleteAppointment } from '../IDeleteAppointment';

export class DeleteAppointment implements IDeleteAppointment {
  constructor(
    private appointmentRepository: IAppointmentRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.appointmentRepository.deleteAsync(id);
    if (!result) throw new DefaultError('Appointment not found');
    return true;
  }
}
