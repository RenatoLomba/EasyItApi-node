import { DefaultError } from '../../adapters/errors/DefaultError';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IExpertIsFavorited } from '../IExpertIsFavorited';

export class ExpertIsFavorited implements IExpertIsFavorited {
  constructor(
    private userRepository: IUserRepository,
    private expertRepository: IExpertRepository,
    private favoriteRepository: IFavoriteRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(expertId: string, userId: string): Promise<boolean> {
    const user = await this.userRepository.selectByIdAsync(userId);
    if (!user) throw new DefaultError('User not found', 404);

    const expert = await this.expertRepository.selectByIdAsync(expertId);
    if (!expert) throw new DefaultError('Expert not found', 404);

    const favorite = await this.favoriteRepository.selectByExpertAndUser(expert.id, user.id);
    if (!favorite) return false;
    return true;
  }
}
