import { Request, Response } from 'express';
import { IUnfavoriteUseCase } from '../../../usecases/IUnfavoriteUseCase';

export default class UnfavoriteController {
  constructor(
    private unfavoriteUseCase: IUnfavoriteUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) return response.status(400).json({ error: 'Invalid id' });

    try {
      const result = await this.unfavoriteUseCase.execute(id);
      return response.status(200).json(result);
    } catch (ex) {
      return response.status(400).json({ error: ex.message || 'Unexpected error' });
    }
  }
}
