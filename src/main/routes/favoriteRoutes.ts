import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { favoritesController } from '../implementations/Favorites';

const favoriteRoutes = Router();

favoriteRoutes.post('/', checkTokenMiddleware.check, favoritesController.create);
favoriteRoutes.delete('/:expertId/:userId', checkTokenMiddleware.check, favoritesController.delete);
favoriteRoutes.get('/:expertId/:userId', checkTokenMiddleware.check, favoritesController.isFavorited);

export { favoriteRoutes };
