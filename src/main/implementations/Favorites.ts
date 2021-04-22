import { FavoritesController } from '../../adapters/controllers/FavoritesController';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { FavoriteRepository } from '../../repositories/implementations/FavoriteRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { ExpertIsFavorited } from '../../usecases/implementations/ExpertIsFavorited';
import { FavoriteUseCase } from '../../usecases/implementations/FavoriteUseCase';
import { UnfavoriteUseCase } from '../../usecases/implementations/UnfavoriteUseCase';

const favoriteRepository = new FavoriteRepository();
const userRepository = new UserRepository();
const expertRepository = new ExpertRepository();

const favoriteUseCase = new FavoriteUseCase(
  favoriteRepository,
  userRepository,
  expertRepository,
);
const unfavoriteUseCase = new UnfavoriteUseCase(
  favoriteRepository, expertRepository, userRepository,
);
const expertIsFavorited = new ExpertIsFavorited(
  userRepository, expertRepository, favoriteRepository,
);

const favoritesController = new FavoritesController(
  favoriteUseCase, unfavoriteUseCase, expertIsFavorited,
);

export { favoritesController };
