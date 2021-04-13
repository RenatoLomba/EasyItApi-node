import { Router } from 'express';
import { thumbnailsController } from '../implementations/Thumbnail';
import { uploader } from '../../adapters/middlewares/UploadFilesMiddleware';
import { checkTokenMiddleware } from '../implementations/CheckToken';

const thumbnailsRoutes = Router();

thumbnailsRoutes.post('/', uploader.single('thumbnail'), thumbnailsController.create);

export { thumbnailsRoutes };
