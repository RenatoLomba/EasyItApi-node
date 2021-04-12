import { FavoriteEntity } from '../entities/FavoriteEntity';

export interface IFavoriteRepository {
  insertAsync(favorite: FavoriteEntity): Promise<FavoriteEntity>;
  deleteAsync(id: string): Promise<boolean>;
  selectByExpertAndUser(expertId: string, userId: string): Promise<FavoriteEntity>;
}
