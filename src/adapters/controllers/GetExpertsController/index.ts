import { Request, Response } from 'express';
import { IGetExpertsUseCase } from '../../../usecases/IGetExpertsUseCase';
import GetExpertsDTOResult from './GetExpertsDTOResult';

export default class GetExpertsController {
  constructor(
    private getExpertsUseCase: IGetExpertsUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
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
