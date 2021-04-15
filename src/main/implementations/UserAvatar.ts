import { UserAvatarController } from '../../adapters/controllers/UserAvatarController';
import { UserAvatarRepoository } from '../../repositories/implementations/UserAvatarRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { UploadUserAvatarUseCase } from '../../usecases/implementations/UploadUserAvatarUseCase';

const avatarRepository = new UserAvatarRepoository();
const userRepository = new UserRepository();

const uploadAvatarUseCase = new UploadUserAvatarUseCase(
  avatarRepository, userRepository,
);

const userAvatarController = new UserAvatarController(uploadAvatarUseCase);

export { userAvatarController };
