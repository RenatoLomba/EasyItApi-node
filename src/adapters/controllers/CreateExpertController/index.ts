import { Request, Response } from 'express';
import validator from 'validator';
import CreateExpertDTOResult from './CreateExpertDTOResult';
import { ICreateExpertUseCase } from '../../../usecases/ICreateExpertUseCase';

export default class CreateExpertController {
  constructor(
    private createExpertUseCase: ICreateExpertUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
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
}
