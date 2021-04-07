import GetExpertsController from '../../adapters/controllers/GetExpertsController';
import ExpertRepository from '../../repositories/implementations/ExpertRepository';
import GetExpertsUseCase from '../../usecases/implementations/GetExpertsUseCase';

const expertRepository = new ExpertRepository();

const getExpertsUseCase = new GetExpertsUseCase(expertRepository);

const getExpertsController = new GetExpertsController(getExpertsUseCase);

export default getExpertsController.handle;
