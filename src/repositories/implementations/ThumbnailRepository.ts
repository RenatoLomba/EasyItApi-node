import { getRepository } from 'typeorm';
import { Thumbnail } from '../../database/models/Thumbnail';
import { ThumbnailEntity } from '../../entities/ThumbnailEntity';
import { IThumbnailRepository } from '../IThumbnailRepository';

export class ThumbnailRepository implements IThumbnailRepository {
  async insertAsync(thumbnail: ThumbnailEntity): Promise<ThumbnailEntity> {
    const repository = getRepository(Thumbnail);
    const newThumbnail = repository.create(thumbnail);
    await repository.save(newThumbnail);
    return new ThumbnailEntity(thumbnail);
  }
}
