import { getRepository } from 'typeorm';
import { Testimonial } from '../../database/models/Testimonial';
import { TestimonialEntity } from '../../entities/TestimonialEntity';
import { ITestimonialRepository } from '../ITestimonialRepository';

export class TestimonialRepository implements ITestimonialRepository {
  async selectByExpertAndUser(expertId: string, userId: string): Promise<TestimonialEntity> {
    const testimonialsRepository = getRepository(Testimonial);
    const testimonial = await testimonialsRepository
      .findOne({ where: { expert_id: expertId, user_id: userId } });
    if (!testimonial) return null;
    return new TestimonialEntity(testimonial);
  }

  async selectByExpert(expertId: string): Promise<TestimonialEntity[]> {
    const testimonialsRepository = getRepository(Testimonial);
    const testimonials = await testimonialsRepository.find({ where: { expert_id: expertId } });
    if (testimonials.length === 0) return [];
    const testimonialsList = testimonials.map((testimonial) => new TestimonialEntity(testimonial));
    return testimonialsList;
  }

  async insertAsync(testimonial: TestimonialEntity): Promise<TestimonialEntity> {
    const testimonialsRepository = getRepository(Testimonial);
    const newTestimonial = await testimonialsRepository.create(testimonial);
    await testimonialsRepository.save(newTestimonial);
    return new TestimonialEntity(newTestimonial);
  }

  async selectByIdAsync(id: string): Promise<TestimonialEntity> {
    const testimonialsRepository = getRepository(Testimonial);
    const testimonial = await testimonialsRepository.findOne({ id });
    if (!testimonial) return null;
    return new TestimonialEntity(testimonial);
  }
}
