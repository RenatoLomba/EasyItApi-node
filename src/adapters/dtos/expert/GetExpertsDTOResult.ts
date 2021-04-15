import { ExpertEntity } from '../../../entities/ExpertEntity';
import { ExpertAvatarResult } from '../avatar/ExpertAvatarResult';

export class GetExpertsDTOResult {
  id: string;

  name: string;

  email: string;

  location: string;

  stars: number;

  avatar: ExpertAvatarResult;

  constructor(props: ExpertEntity) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.location = props.location;
    this.stars = props.stars;
    if (props.avatar) {
      this.avatar = new ExpertAvatarResult(props.avatar);
    }
  }
}
