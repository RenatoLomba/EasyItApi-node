import { ExpertsController } from '../../adapters/controllers/ExpertsController';
import { AvatarRepository } from '../../repositories/implementations/UserAvatarRepository';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { CreateExpertUseCase } from '../../usecases/implementations/CreateExpertUseCase';
import { GetCompleteExpertUseCase } from '../../usecases/implementations/GetCompleteExpertUseCase';
import { GetExpertsUseCase } from '../../usecases/implementations/GetExpertsUseCase';

const expertRepository = new ExpertRepository();
const avatarRepository = new AvatarRepository();

const createExpertUseCase = new CreateExpertUseCase(expertRepository);
const getExpertsUseCase = new GetExpertsUseCase(expertRepository, avatarRepository);
const getCompleteExpertUseCase = new GetCompleteExpertUseCase(expertRepository, avatarRepository);

const expertsController = new ExpertsController(
  createExpertUseCase, getExpertsUseCase, getCompleteExpertUseCase,
);

export { expertsController };
