import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CheckTokenMiddleware } from '../../adapters/middlewares/CheckTokenMiddleware';
import { CheckTokenUseCase } from '../../usecases/implementations/CheckTokenUseCase';

const userRepository = new UserRepository();

const checkTokenUseCase = new CheckTokenUseCase(userRepository);

const checkTokenMiddleware = new CheckTokenMiddleware(checkTokenUseCase);

export { checkTokenMiddleware };
