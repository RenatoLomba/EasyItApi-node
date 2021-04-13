import { ThumbnailEntity } from '../entities/ThumbnailEntity';
import { IThumbnailDTO } from './dtos/IThumbnailDTO';

export interface IUploadThumbnailUseCase {
  execute(thumbnail: IThumbnailDTO): Promise<ThumbnailEntity>;
}
