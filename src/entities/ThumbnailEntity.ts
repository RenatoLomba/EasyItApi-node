export class ThumbnailEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'expert_id': string;

  image: Buffer;

  'content_type': string;

  'original_name': string;

  constructor(thumbnail: ThumbnailEntity) {
    Object.assign(this, thumbnail);
  }
}
