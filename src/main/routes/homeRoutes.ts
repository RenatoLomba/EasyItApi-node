import { Router } from 'express';

const homeRoutes = Router();

homeRoutes.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));

export { homeRoutes };
