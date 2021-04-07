import CreateUserUseCase from '../../usecases/implementations/CreateUserUseCase';
import CreateUserController from '../../adapters/controllers/CreateUserController';
import UserRepository from '../../repositories/implementations/UserRepository';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

const createUserController = new CreateUserController(createUserUseCase);

export default createUserController.handle;
