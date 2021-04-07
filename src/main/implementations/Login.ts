import UserRepository from '../../repositories/implementations/UserRepository';
import LoginController from '../../adapters/controllers/LoginController';
import LoginUseCase from '../../usecases/implementations/LoginUseCase';

const userRepository = new UserRepository();

const loginUseCase = new LoginUseCase(userRepository);

const loginController = new LoginController(loginUseCase);

export default loginController.handle;
