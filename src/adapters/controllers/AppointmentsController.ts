import { Request, Response } from 'express';
import { ICreateAppointmentUseCase } from '../../usecases/ICreateAppointmentUseCase';
import { IDeleteAppointment } from '../../usecases/IDeleteAppointment';
import { AppointmentDTOResult } from '../dtos/appointment/AppointmentDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class AppointmentController {
  constructor(
    private createAppointmentUseCase: ICreateAppointmentUseCase,
    private deleteAppointment: IDeleteAppointment,
  ) {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
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

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) throw new DefaultError('Id não informado');
    const result = await this.deleteAppointment.execute(id);
    return res.status(200).json(result);
  }
}
