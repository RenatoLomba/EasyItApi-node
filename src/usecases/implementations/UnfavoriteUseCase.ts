import { DefaultError } from '../../adapters/errors/DefaultError';
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository';
import { IUnfavoriteUseCase } from '../IUnfavoriteUseCase';

export class UnfavoriteUseCase implements IUnfavoriteUseCase {
  constructor(
    private favoriteRepository: IFavoriteRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.favoriteRepository.deleteAsync(id);
    if (!result) {
      throw new DefaultError('Favorite not found');
    }

    return result;
  }
}
