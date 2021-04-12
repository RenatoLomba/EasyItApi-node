import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { favoritesController } from '../implementations/Favorites';

const favoriteRoutes = Router();

favoriteRoutes.post('/', favoritesController.create);
favoriteRoutes.delete('/:id', favoritesController.delete);

export { favoriteRoutes };
