import FavoriteEntity from '../entities/FavoriteEntity';

export interface IFavoriteRepository {
  insertAsync(favorite: FavoriteEntity): Promise<FavoriteEntity>;
  deleteAsync(id: string): Promise<boolean>;
}
