export class UserAvatarEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'user_id': string;

  image: Buffer;

  'content_type': string;

  'original_name': string;

  'file_name': string;

  constructor(avatar: UserAvatarEntity) {
    Object.assign(this, avatar);
  }
}
