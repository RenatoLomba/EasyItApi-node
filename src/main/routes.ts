import {
  Express,
} from 'express';
import { appointmentRoutes } from './routes/appointmentRoutes';
import { avatarRoutes } from './routes/avatarRoutes';
import { expertRoutes } from './routes/expertRoutes';
import { favoriteRoutes } from './routes/favoriteRoutes';
import { homeRoutes } from './routes/homeRoutes';
import { serviceRoutes } from './routes/serviceRoutes';
import { testimonialRoutes } from './routes/testimonialRoutes';
import { thumbnailsRoutes } from './routes/thumbnailRoutes';
import { userRoutes } from './routes/userRoutes';

function router(app: Express): void {
  app.use('/', homeRoutes);
  app.use('/users', userRoutes);
  app.use('/experts', expertRoutes);
  app.use('/favorites', favoriteRoutes);
  app.use('/services', serviceRoutes);
  app.use('/testimonials', testimonialRoutes);
  app.use('/appointments', appointmentRoutes);
  app.use('/thumbnails', thumbnailsRoutes);
  app.use('/avatars', avatarRoutes);
}

export { router };
