import { DefaultError } from '../../adapters/errors/DefaultError';
import { ThumbnailEntity } from '../../entities/ThumbnailEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IThumbnailRepository } from '../../repositories/IThumbnailRepository';
import { IThumbnailDTO } from '../dtos/IThumbnailDTO';
import { IUploadThumbnailUseCase } from '../IUploadThumbnailUseCase';

export class UploadThumbnailUseCase implements IUploadThumbnailUseCase {
  constructor(
    private thumbnailRepository: IThumbnailRepository,
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(thumbnail: IThumbnailDTO): Promise<ThumbnailEntity> {
    const expert = await this.expertRepository.selectByIdAsync(thumbnail.expert_id);
    if (!expert) throw new DefaultError('Expert not found');

    const newThumbnail = new ThumbnailEntity(thumbnail);
    const thumbnailCreated = await this.thumbnailRepository.insertAsync(newThumbnail);
    return thumbnailCreated;
  }
}
