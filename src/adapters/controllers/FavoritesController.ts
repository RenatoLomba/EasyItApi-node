import { Request, Response } from 'express';
import { IExpertIsFavorited } from '../../usecases/IExpertIsFavorited';
import { IFavoriteUseCase } from '../../usecases/IFavoriteUseCase';
import { IUnfavoriteUseCase } from '../../usecases/IUnfavoriteUseCase';
import { FavoriteDTOResult } from '../dtos/favorite/FavoriteDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class FavoritesController {
  constructor(
    private favoriteUseCase: IFavoriteUseCase,
    private unfavoriteUseCase: IUnfavoriteUseCase,
    private expertIsFavorited: IExpertIsFavorited,
  ) {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.isFavorited = this.isFavorited.bind(this);
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
    const { expertId, userId } = request.params;
    if (!expertId) throw new DefaultError('Id de expert inválido');
    if (!userId) throw new DefaultError('Id de usuário inválido');

    const result = await this.unfavoriteUseCase.execute(userId, expertId);
    return response.status(200).json(result);
  }

  async isFavorited(req: Request, res: Response): Promise<Response> {
    const { expertId, userId } = req.params;
    if (!expertId || !userId) throw new DefaultError('Id não informado');

    const result = await this.expertIsFavorited.execute(expertId, userId);
    return res.status(200).json(result);
  }
}
