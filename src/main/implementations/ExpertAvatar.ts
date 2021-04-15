import { ExpertAvatarController } from '../../adapters/controllers/ExpertAvatarController';
import { ExpertAvatarRepository } from '../../repositories/implementations/ExpertAvatarRepository';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { UploadExpertAvatarUseCase } from '../../usecases/implementations/UploadExpertAvatarUseCase';

const expertAvatarRepository = new ExpertAvatarRepository();
const expertRepository = new ExpertRepository();

const uploadExpertAvatarUseCase = new UploadExpertAvatarUseCase(
  expertAvatarRepository, expertRepository,
);

const expertAvatarController = new ExpertAvatarController(uploadExpertAvatarUseCase);

export { expertAvatarController };
