import { Router } from 'express';
import { checkTokenMiddleware } from '../implementations/CheckToken';
import { testimonialsController } from '../implementations/Testimonial';

const testimonialRoutes = Router();

testimonialRoutes.post('/', testimonialsController.create);

export { testimonialRoutes };
