import { ExpertsController } from '../../adapters/controllers/ExpertsController';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { CreateExpertUseCase } from '../../usecases/implementations/CreateExpertUseCase';
import { GetCompleteExpertUseCase } from '../../usecases/implementations/GetCompleteExpertUseCase';
import { GetExpertsByServiceName } from '../../usecases/implementations/GetExpertsByServiceName';
import { GetExpertsUseCase } from '../../usecases/implementations/GetExpertsUseCase';

const expertRepository = new ExpertRepository();

const createExpertUseCase = new CreateExpertUseCase(expertRepository);
const getExpertsUseCase = new GetExpertsUseCase(expertRepository);
const getCompleteExpertUseCase = new GetCompleteExpertUseCase(expertRepository);
const getExpertsByServiceName = new GetExpertsByServiceName(expertRepository);

const expertsController = new ExpertsController(
  createExpertUseCase, getExpertsUseCase, getCompleteExpertUseCase, getExpertsByServiceName,
);

export { expertsController };
