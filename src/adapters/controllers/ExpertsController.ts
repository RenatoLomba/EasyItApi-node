import { Request, Response } from 'express';
import validator from 'validator';
import { ICreateExpertUseCase } from '../../usecases/ICreateExpertUseCase';
import { IGetCompleteExpertUseCase } from '../../usecases/IGetCompleteExpertUseCase';
import { IGetExpertsUseCase } from '../../usecases/IGetExpertsUseCase';
import { CreateExpertDTOResult } from '../dtos/expert/CreateExpertDTOResult';
import { GetCompleteExpertDTO } from '../dtos/expert/GetCompleteExpertDTO';
import { GetExpertsDTOResult } from '../dtos/expert/GetExpertsDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class ExpertsController {
  constructor(
    private createExpertUseCase: ICreateExpertUseCase,
    private getExpertsUseCase: IGetExpertsUseCase,
    private getCompleteExpertUseCase: IGetCompleteExpertUseCase,
  ) {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.show = this.show.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, password, location,
    } = req.body;

    if (!name || !email || !password || !location) throw new DefaultError('Alguns campos estão vazios');
    if (!validator.isEmail(email)) throw new DefaultError('Email inválido');

    const expertCreated = await this.createExpertUseCase.execute({
      name, email, password, location,
    });
    const expertCreatedResult = new CreateExpertDTOResult(expertCreated);
    return res.status(201).json(expertCreatedResult);
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { location } = req.query;

    const experts = await this.getExpertsUseCase.execute(location ? String(location) : null);
    const expertsList = experts.length > 0
      ? experts.map((expert) => new GetExpertsDTOResult(expert)) : [];
    return res.status(200).json(expertsList);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) throw new DefaultError('Id não informado');
    const expert = await this.getCompleteExpertUseCase.execute(id);
    const expertResult = new GetCompleteExpertDTO(expert);
    return res.status(200).json(expertResult);
  }
}
