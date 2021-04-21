import { FavoriteEntity } from '../../../entities/FavoriteEntity';
import { GetExpertsDTOResult } from '../expert/GetExpertsDTOResult';

export class FavoriteDTOResult {
  id: string;

  'user_id': string;

  'expert_id': string;

  expert?: GetExpertsDTOResult;

  constructor(props: FavoriteEntity) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.expert_id = props.expert_id;
    this.expert = props.expert && new GetExpertsDTOResult(props.expert);
  }
}
