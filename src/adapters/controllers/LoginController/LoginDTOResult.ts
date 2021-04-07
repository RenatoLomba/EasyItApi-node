import Token from '../../../entities/Token';

export default class LoginDTOResult {
  id: string;

  name: string;

  email: string;

  token: string;

  expiresIn: string;

  constructor(token: Token) {
    this.id = token.user.id;
    this.name = token.user.name;
    this.email = token.user.email;
    this.token = token.token;
    this.expiresIn = token.expiresIn;
  }
}
