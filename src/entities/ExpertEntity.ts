import { ServiceEntity } from './ServiceEntity';
import { ThumbnailEntity } from './ThumbnailEntity';

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

  constructor(expert: ExpertEntity) {
    Object.assign(this, expert);
  }
}
