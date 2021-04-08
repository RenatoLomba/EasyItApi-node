import FavoriteEntity from '../../../entities/FavoriteEntity';

export default class FavoriteDTOResult {
  id: string;

  'user_id': string;

  'expert_id': string;

  constructor(props: FavoriteEntity) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.expert_id = props.expert_id;
  }
}
