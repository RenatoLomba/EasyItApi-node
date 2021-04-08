import FavoriteController from '../../adapters/controllers/FavoriteController';
import ExpertRepository from '../../repositories/implementations/ExpertRepository';
import FavoriteRepository from '../../repositories/implementations/FavoriteRepository';
import UserRepository from '../../repositories/implementations/UserRepository';
import FavoriteUseCase from '../../usecases/implementations/FavoriteUseCase';

const favoriteRepository = new FavoriteRepository();
const userRepository = new UserRepository();
const expertRepository = new ExpertRepository();

const favoriteUseCase = new FavoriteUseCase(favoriteRepository, userRepository, expertRepository);

const favoriteController = new FavoriteController(favoriteUseCase);

export default favoriteController.handle;
