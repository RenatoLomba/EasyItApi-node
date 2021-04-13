import { ThumbnailEntity } from '../../../entities/ThumbnailEntity';

export class ThumbnailResult {
  id: string;

  'expert_id': string;

  'content_type': string;

  'original_name': string;

  image: string;

  constructor(thumbnail: ThumbnailEntity) {
    this.content_type = thumbnail.content_type;
    this.expert_id = thumbnail.expert_id;
    this.id = thumbnail.id;
    this.image = thumbnail.image.toString('base64');
    this.original_name = thumbnail.original_name;
  }
}
