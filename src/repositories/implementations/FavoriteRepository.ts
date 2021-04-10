import { getRepository } from 'typeorm';
import Favorite from '../../database/models/Favorite';
import { FavoriteEntity } from '../../entities/FavoriteEntity';
import { IFavoriteRepository } from '../IFavoriteRepository';

export class FavoriteRepository implements IFavoriteRepository {
  constructor() {
    this.insertAsync = this.insertAsync.bind(this);
    this.deleteAsync = this.deleteAsync.bind(this);
  }

  async insertAsync(favorite: FavoriteEntity): Promise<FavoriteEntity> {
    const favoriteRepository = getRepository(Favorite);
    const newFavorite = favoriteRepository.create(favorite);
    await favoriteRepository.save(newFavorite);
    return new FavoriteEntity(newFavorite);
  }

  async deleteAsync(id: string): Promise<boolean> {
    const favoriteRepository = getRepository(Favorite);
    const favorite = await favoriteRepository.findOne({ id });
    if (!favorite) {
      return false;
    }
    await favoriteRepository.remove(favorite);
    return true;
  }
}
