import { TestimonialEntity } from '../entities/TestimonialEntity';
import { ICreateTestimonialDTO } from './dtos/ICreateTestimonialDTO';

export interface ICreateTestimonialUseCase {
  execute(testimonial: ICreateTestimonialDTO): Promise<TestimonialEntity>
}
