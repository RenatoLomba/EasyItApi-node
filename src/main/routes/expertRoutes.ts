import { Router } from 'express';
// import CheckToken from '../implementations/CheckToken';
import CreateExpert from '../implementations/CreateExpert';
import GetExperts from '../implementations/GetExperts';

const expertRoutes = Router();

expertRoutes.post('/', CreateExpert);
expertRoutes.get('/', GetExperts);

export default expertRoutes;
