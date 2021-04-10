import { FavoriteEntity } from './FavoriteEntity';

export class UserEntity {
  id?: string;

  name: string;

  email: string;

  password: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  favorites?: FavoriteEntity[];

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
