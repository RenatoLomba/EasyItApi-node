export default class UserEntity {
  id?: string;

  name: string;

  email: string;

  password: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
