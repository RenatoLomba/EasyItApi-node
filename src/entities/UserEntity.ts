import { FavoriteEntity } from './FavoriteEntity';
import { TestimonialEntity } from './TestimonialEntity';

export class UserEntity {
  id?: string;

  name: string;

  email: string;

  password: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  favorites?: FavoriteEntity[];

  testimonials?: TestimonialEntity[];

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
