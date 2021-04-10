import { Request, Response } from 'express';
import { IFavoriteUseCase } from '../../usecases/IFavoriteUseCase';
import { IUnfavoriteUseCase } from '../../usecases/IUnfavoriteUseCase';
import { FavoriteDTOResult } from '../dtos/favorite/FavoriteDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class FavoritesController {
  constructor(
    private favoriteUseCase: IFavoriteUseCase,
    private unfavoriteUseCase: IUnfavoriteUseCase,
  ) {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { userId, expertId } = req.body;

    if (!userId || !expertId) throw new DefaultError('Alguns campos estão vazios');

    const favoriteCreated = await this.favoriteUseCase.execute(
      { user_id: userId, expert_id: expertId },
    );
    const favoriteResult = new FavoriteDTOResult(favoriteCreated);
    return res.status(201).json(favoriteResult);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) throw new DefaultError('Id de favorito inválido');

    const result = await this.unfavoriteUseCase.execute(id);
    return response.status(200).json(result);
  }
}
