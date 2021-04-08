import UnfavoriteController from '../../adapters/controllers/UnfavoriteController';
import FavoriteRepository from '../../repositories/implementations/FavoriteRepository';
import UnfavoriteUseCase from '../../usecases/implementations/UnfavoriteUseCase';

const favoriteRepository = new FavoriteRepository();

const unfavoriteUseCase = new UnfavoriteUseCase(favoriteRepository);

const unfavoriteController = new UnfavoriteController(unfavoriteUseCase);

export default unfavoriteController.handle;
