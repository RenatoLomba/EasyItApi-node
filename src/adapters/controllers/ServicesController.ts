import { Request, Response } from 'express';
import { ICreateServiceUseCase } from '../../usecases/ICreateServiceUseCase';
import { ServiceDTOResult } from '../dtos/service/ServiceDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class ServicesController {
  constructor(
    private createServiceUseCase: ICreateServiceUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      expertId, name, code, description, price,
    } = req.body;

    if (!expertId || !name || !price) throw new DefaultError('Campos necessários não preenchidos');

    const serviceCreated = await this.createServiceUseCase.execute({
      expert_id: expertId, name, code, description, price,
    });
    const serviceResult = new ServiceDTOResult(serviceCreated);
    return res.status(201).json(serviceResult);
  }
}
