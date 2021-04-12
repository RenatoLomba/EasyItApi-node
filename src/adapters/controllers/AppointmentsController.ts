import { Request, Response } from 'express';
import { ICreateAppointmentUseCase } from '../../usecases/ICreateAppointmentUseCase';
import { AppointmentDTOResult } from '../dtos/appointment/AppointmentDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class AppointmentController {
  constructor(
    private createAppointmentUseCase: ICreateAppointmentUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      expertId, userId, serviceId, date,
    } = req.body;

    if (!expertId || !userId || !serviceId || !date) {
      throw new DefaultError('Campos necessários vazios');
    }

    const appointment = await this.createAppointmentUseCase.execute({
      date: new Date(date),
      expert_id: expertId,
      user_id: userId,
      service_id: serviceId,
    });
    const appointmentResult = new AppointmentDTOResult(appointment);
    return res.status(201).json(appointmentResult);
  }
}
