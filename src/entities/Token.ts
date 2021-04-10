import { UserEntity } from './UserEntity';

export class Token {
  user: UserEntity;

  token: string;

  expiresIn: string;

  constructor(user: UserEntity, token: string, expiresIn: string) {
    this.user = user;
    this.token = token;
    this.expiresIn = expiresIn;
  }
}
