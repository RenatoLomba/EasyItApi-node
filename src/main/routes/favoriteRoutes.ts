import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { favoritesController } from '../implementations/Favorites';

const favoriteRoutes = Router();

favoriteRoutes.post('/', checkTokenMiddleware.check, favoritesController.create);
favoriteRoutes.delete('/:id', checkTokenMiddleware.check, favoritesController.delete);

export { favoriteRoutes };
