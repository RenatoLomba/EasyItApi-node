import { DefaultError } from '../../adapters/errors/DefaultError';
import { FavoriteEntity } from '../../entities/FavoriteEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IFavoriteDTO } from '../dtos/IFavoriteDTO';
import { IFavoriteUseCase } from '../IFavoriteUseCase';

export class FavoriteUseCase implements IFavoriteUseCase {
  constructor(
    private favoriteRepository: IFavoriteRepository,
    private userRepository: IUserRepository,
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(favorite: IFavoriteDTO): Promise<FavoriteEntity> {
    const userExist = await this.userRepository.selectByIdAsync(favorite.user_id);

    if (!userExist) {
      throw new DefaultError('User not found');
    }

    const expertExist = await this.expertRepository.selectByIdAsync(favorite.expert_id);

    if (!expertExist) {
      throw new DefaultError('Expert not found');
    }

    const newFavorite = new FavoriteEntity(favorite);
    const favoriteCreated = await this.favoriteRepository.insertAsync(newFavorite);
    return favoriteCreated;
  }
}
