import { TestimonialsController } from '../../adapters/controllers/TestimonialsController';
import { ExpertRepository } from '../../repositories/implementations/ExpertRepository';
import { TestimonialRepository } from '../../repositories/implementations/TestimonialRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateTestimonialUseCase } from '../../usecases/implementations/CreateTestimonialUseCase';

const testimonialRepository = new TestimonialRepository();
const userRepository = new UserRepository();
const expertRepository = new ExpertRepository();

const createTestimonialUseCase = new CreateTestimonialUseCase(
  testimonialRepository, userRepository, expertRepository,
);

const testimonialsController = new TestimonialsController(createTestimonialUseCase);

export { testimonialsController };
