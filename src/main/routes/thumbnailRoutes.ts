import { Router } from 'express';
import { ThumbnailsController } from '../../adapters/controllers/ThumbnailsController';
import { upload } from '../../adapters/middlewares/UploadFilesMiddleware';
import { checkTokenMiddleware } from '../implementations/CheckToken';

const thumbnailsRoutes = Router();

thumbnailsRoutes.post('/', upload.single('thumbnail'), new ThumbnailsController().create);

export { thumbnailsRoutes };
