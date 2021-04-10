import { FavoriteEntity } from '../entities/FavoriteEntity';
import { IFavoriteDTO } from './dtos/IFavoriteDTO';

export interface IFavoriteUseCase {
  execute(favorite: IFavoriteDTO): Promise<FavoriteEntity>;
}
