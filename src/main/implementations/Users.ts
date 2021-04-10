import { UsersController } from '../../adapters/controllers/UsersController';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserUseCase } from '../../usecases/implementations/CreateUserUseCase';
import { LoginUseCase } from '../../usecases/implementations/LoginUseCase';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

const usersController = new UsersController(createUserUseCase, loginUseCase);

export { usersController };
