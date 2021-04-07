import { Express } from 'express';
import expertRoutes from './routes/expertRoutes';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';

function router(app: Express): void {
  app.use('/', homeRoutes);
  app.use('/users', userRoutes);
  app.use('/experts', expertRoutes);
}

export default router;
