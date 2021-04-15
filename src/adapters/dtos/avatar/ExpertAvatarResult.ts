import fs from 'fs';
import { resolve } from 'path';
import { ExpertAvatarEntity } from '../../../entities/ExpertAvatarEntity';

export class ExpertAvatarResult {
  id: string;

  'expert_id': string;

  'content_type': string;

  'original_name': string;

  'file_name': string;

  image: string;

  constructor(avatar: ExpertAvatarEntity) {
    this.content_type = avatar.content_type;
    this.expert_id = avatar.expert_id;
    this.id = avatar.id;
    this.original_name = avatar.original_name;
    this.file_name = avatar.file_name;

    const path = resolve('uploads', 'images', avatar.file_name);

    fs.writeFileSync(path, avatar.image);
    this.image = `${process.env.COMPLETE_URL}/${avatar.file_name}`;
  }
}
