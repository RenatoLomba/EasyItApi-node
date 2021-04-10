import { Request, Response } from 'express';
import validator from 'validator';
import { ICreateExpertUseCase } from '../../usecases/ICreateExpertUseCase';
import { IGetExpertsUseCase } from '../../usecases/IGetExpertsUseCase';
import { CreateExpertDTOResult } from '../dtos/expert/CreateExpertDTOResult';
import { GetExpertsDTOResult } from '../dtos/expert/GetExpertsDTOResult';

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

    if (!name || !email || !password || !location) return res.status(400).json({ error: 'Campos vazios' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email inválido' });

    try {
      const expertCreated = await this.createExpertUseCase.execute({
        name, email, password, location,
      });
      const expertCreatedResult = new CreateExpertDTOResult(expertCreated);
      return res.status(201).json(expertCreatedResult);
    } catch (ex) {
      return res.status(400).json({ error: ex.message || 'Unexpected error' });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { location } = req.query;

    try {
      const experts = await this.getExpertsUseCase.execute(location ? String(location) : null);
      const expertsList = experts.length > 0
        ? experts.map((expert) => new GetExpertsDTOResult(expert)) : [];
      return res.status(200).json(expertsList);
    } catch (err) {
      return res.status(400).json({ error: err.message || 'Unexpected error' });
    }
  }
}
