import { Request, Response } from 'express';
import validator from 'validator';
import { ICreateExpertUseCase } from '../../usecases/ICreateExpertUseCase';
import { IGetExpertsUseCase } from '../../usecases/IGetExpertsUseCase';
import { CreateExpertDTOResult } from '../dtos/expert/CreateExpertDTOResult';
import { GetExpertsDTOResult } from '../dtos/expert/GetExpertsDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class ExpertsController {
  constructor(
    private createExpertUseCase: ICreateExpertUseCase,
    private getExpertsUseCase: IGetExpertsUseCase,
  ) {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
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
}
