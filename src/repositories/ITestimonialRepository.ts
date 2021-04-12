import { TestimonialEntity } from '../entities/TestimonialEntity';

export interface ITestimonialRepository {
  insertAsync(testimonial: TestimonialEntity): Promise<TestimonialEntity>;
  selectByIdAsync(id: string): Promise<TestimonialEntity>;
  selectByExpert(expertId: string): Promise<TestimonialEntity[]>;
  selectByExpertAndUser(expertId: string, userId: string): Promise<TestimonialEntity>;
}
