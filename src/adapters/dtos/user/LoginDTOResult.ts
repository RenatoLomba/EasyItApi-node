import { Token } from '../../../entities/Token';

interface FavoriteDTO {
  id?: string;
  'user_id': string;
  'expert_id': string;
}

export class LoginDTOResult {
  id: string;

  name: string;

  email: string;

  token: string;

  expiresIn: string;

  favorites: FavoriteDTO[];

  constructor(token: Token) {
    this.id = token.user.id;
    this.name = token.user.name;
    this.email = token.user.email;
    this.token = token.token;
    this.expiresIn = token.expiresIn;
    this.favorites = token.user.favorites.map((favorite) => (
      { id: favorite.id, expert_id: favorite.expert_id, user_id: favorite.user_id } as FavoriteDTO
    ));
  }
}
