import ExpertRepository from '../../repositories/implementations/ExpertRepository';
import CreateExpertController from '../../adapters/controllers/CreateExpertController';
import CreateExpertUseCase from '../../usecases/implementations/CreateExpertUseCase';

const expertRepository = new ExpertRepository();

const createExpertUseCase = new CreateExpertUseCase(expertRepository);

const createExpertController = new CreateExpertController(createExpertUseCase);

export default createExpertController.handle;
