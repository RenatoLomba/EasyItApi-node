import { UsersController } from '../../adapters/controllers/UsersController';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserUseCase } from '../../usecases/implementations/CreateUserUseCase';
import { LoginByTokenUseCase } from '../../usecases/implementations/LoginByTokenUseCase';
import { LoginUseCase } from '../../usecases/implementations/LoginUseCase';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const loginByTokenUseCase = new LoginByTokenUseCase(userRepository);

const usersController = new UsersController(
  createUserUseCase, loginUseCase, loginByTokenUseCase,
);

export { usersController };
