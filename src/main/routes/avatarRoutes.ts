import { Router } from 'express';
import { userAvatarController } from '../implementations/UserAvatar';
import { uploader } from '../../adapters/middlewares/UploadFilesMiddleware';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { expertAvatarController } from '../implementations/ExpertAvatar';

const avatarRoutes = Router();

avatarRoutes.post('/user',
  checkTokenMiddleware.check,
  uploader.single('avatar'),
  userAvatarController.create);

avatarRoutes.post('/expert',
  checkTokenMiddleware.check,
  uploader.single('avatar'),
  expertAvatarController.create);

export { avatarRoutes };
