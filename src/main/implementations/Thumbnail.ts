import { ThumbnailsController } from '../../adapters/controllers/ThumbnailsController';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { ThumbnailRepository } from '../../repositories/implementations/ThumbnailRepository';
import { UploadThumbnailUseCase } from '../../usecases/implementations/UploadThumbnailUseCase';

const thumbnailRepository = new ThumbnailRepository();
const expertRepository = new ExpertRepository();

const uploadThumbnailUseCase = new UploadThumbnailUseCase(
  thumbnailRepository, expertRepository,
);

const thumbnailsController = new ThumbnailsController(uploadThumbnailUseCase);
export { thumbnailsController };
