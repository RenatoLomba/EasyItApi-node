import { resolve } from 'path';
import fs from 'fs';
import { ThumbnailEntity } from '../../../entities/ThumbnailEntity';
import { ENV } from '../../../main/environment';

export class ThumbnailResult {
  id: string;

  'expert_id': string;

  'content_type': string;

  'original_name': string;

  'file_name': string;

  image: string;

  constructor(thumbnail: ThumbnailEntity) {
    this.content_type = thumbnail.content_type;
    this.expert_id = thumbnail.expert_id;
    this.id = thumbnail.id;
    this.file_name = thumbnail.file_name;
    this.original_name = thumbnail.original_name;

    const path = resolve('uploads', 'images', thumbnail.file_name);

    fs.writeFileSync(path, thumbnail.image);
    this.image = `${ENV.COMPLETE_URL}/${thumbnail.file_name}`;
  }
}
