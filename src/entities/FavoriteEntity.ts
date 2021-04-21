import { ExpertEntity } from './ExpertEntity';

export class FavoriteEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  'user_id': string;

  'expert_id': string;

  expert?: ExpertEntity;

  constructor(favorite: FavoriteEntity) {
    Object.assign(this, favorite);
  }
}
