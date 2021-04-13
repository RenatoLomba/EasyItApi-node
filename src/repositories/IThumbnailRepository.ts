import { ThumbnailEntity } from '../entities/ThumbnailEntity';

export interface IThumbnailRepository {
  insertAsync(thumbnail: ThumbnailEntity): Promise<ThumbnailEntity>;
}
