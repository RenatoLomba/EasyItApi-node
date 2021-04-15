import fs from 'fs';
import { resolve } from 'path';
import { UserAvatarEntity } from '../../../entities/UserAvatarEntity';

export class UserAvatarResult {
  id: string;

  'user_id': string;

  'content_type': string;

  'original_name': string;

  'file_name': string;

  image: string;

  constructor(avatar: UserAvatarEntity) {
    this.content_type = avatar.content_type;
    this.user_id = avatar.user_id;
    this.id = avatar.id;
    this.original_name = avatar.original_name;
    this.file_name = avatar.file_name;

    const path = resolve('uploads', 'images', avatar.file_name);

    fs.writeFileSync(path, avatar.image);
    this.image = `${process.env.COMPLETE_URL}/${avatar.file_name}`;
  }
}
