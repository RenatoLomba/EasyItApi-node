import { DefaultError } from '../../adapters/errors/DefaultError';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUnfavoriteUseCase } from '../IUnfavoriteUseCase';

export class UnfavoriteUseCase implements IUnfavoriteUseCase {
  constructor(
    private favoriteRepository: IFavoriteRepository,
    private expertRepository: IExpertRepository,
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(userId: string, expertId: string): Promise<boolean> {
    const user = await this.userRepository.selectByIdAsync(userId);
    if (!user) throw new DefaultError('User not found');

    const expert = await this.expertRepository.selectByIdAsync(expertId);
    if (!expert) throw new DefaultError('Expert not found');

    const favorite = await this.favoriteRepository.selectByExpertAndUser(expertId, userId);
    if (!favorite) throw new DefaultError('Expert is not favorited');

    const result = await this.favoriteRepository.deleteAsync(favorite.id);

    return result;
  }
}
