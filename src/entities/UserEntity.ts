import { UserAvatarEntity } from './UserAvatarEntity';
import { FavoriteEntity } from './FavoriteEntity';
import { TestimonialEntity } from './TestimonialEntity';
import { AppointmentEntity } from './AppointmentEntity';

export class UserEntity {
  id?: string;

  name: string;

  email: string;

  password: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  favorites?: FavoriteEntity[];

  testimonials?: TestimonialEntity[];

  avatar?: UserAvatarEntity;

  appointments?: AppointmentEntity[];

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
