export class TestimonialEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'user_id': string;

  'expert_id': string;

  description?: string;

  stars: number;

  constructor(testimonial: TestimonialEntity) {
    Object.assign(this, testimonial);
  }
}
