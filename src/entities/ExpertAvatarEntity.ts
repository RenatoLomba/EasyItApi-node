export class ExpertAvatarEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'expert_id': string;

  image: Buffer;

  'content_type': string;

  'original_name': string;

  'file_name': string;

  constructor(avatar: ExpertAvatarEntity) {
    Object.assign(this, avatar);
  }
}
