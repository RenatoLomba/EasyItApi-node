import { Router } from 'express';
// import CheckToken from '../implementations/CheckToken';
import Favorite from '../implementations/Favorite';
import Unfavorite from '../implementations/Unfavorite';

const favoriteRoutes = Router();

favoriteRoutes.post('/', Favorite);
favoriteRoutes.delete('/:id', Unfavorite);

export default favoriteRoutes;
