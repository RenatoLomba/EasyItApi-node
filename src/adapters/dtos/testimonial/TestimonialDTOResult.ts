import { TestimonialEntity } from '../../../entities/TestimonialEntity';
import { IUserGenericType } from '../user/IUserGenericType';

export class TestimonialDTOResult {
  id: string;

  'user_id': string;

  'expert_id': string;

  description?: string;

  stars: number;

  user?: IUserGenericType;

  constructor(testimonial: TestimonialEntity) {
    this.id = testimonial.id;
    this.description = testimonial.description;
    this.stars = testimonial.stars;
    this.expert_id = testimonial.expert_id;
    this.user_id = testimonial.user_id;
    this.user = testimonial.user && {
      id: testimonial.user.id,
      email: testimonial.user.email,
      name: testimonial.user.name,
    } as IUserGenericType;
  }
}
