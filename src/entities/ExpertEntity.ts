import { ServiceEntity } from './ServiceEntity';
import { ThumbnailEntity } from './ThumbnailEntity';
import { ExpertAvatarEntity } from './ExpertAvatarEntity';
import { TestimonialEntity } from './TestimonialEntity';

export class ExpertEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  name: string;

  email: string;

  password: string;

  stars?: number;

  location: string;

  services?: ServiceEntity[];

  thumbnails?: ThumbnailEntity[];

  avatar?: ExpertAvatarEntity;

  testimonials?: TestimonialEntity[];

  constructor(expert: ExpertEntity) {
    Object.assign(this, expert);
  }
}
