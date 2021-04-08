import { Request, Response } from 'express';
import { IFavoriteUseCase } from '../../../usecases/IFavoriteUseCase';
import FavoriteDTOResult from './FavoriteDTOResult';

export default class FavoriteController {
  constructor(
    private favoriteUseCase: IFavoriteUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, expertId } = req.body;

    if (!userId || !expertId) return res.status(400).json({ error: 'Campos vazios' });

    try {
      const favoriteCreated = await this.favoriteUseCase.execute(
        { user_id: userId, expert_id: expertId },
      );
      const favoriteResult = new FavoriteDTOResult(favoriteCreated);
      return res.status(201).json(favoriteResult);
    } catch (ex) {
      return res.status(400).json({ error: ex.message || 'Unexpected error' });
    }
  }
}
