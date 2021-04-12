import { TestimonialEntity } from '../../../entities/TestimonialEntity';

export class TestimonialDTOResult {
  id: string;

  'user_id': string;

  'expert_id': string;

  description?: string;

  stars: number;

  constructor(testimonial: TestimonialEntity) {
    this.id = testimonial.id;
    this.description = testimonial.description;
    this.stars = testimonial.stars;
    this.expert_id = testimonial.expert_id;
    this.user_id = testimonial.user_id;
  }
}
