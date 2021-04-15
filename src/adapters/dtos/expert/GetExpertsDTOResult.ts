import { ExpertEntity } from '../../../entities/ExpertEntity';
import { UserAvatarResult } from '../avatar/UserAvatarResult';

export class GetExpertsDTOResult {
  id: string;

  name: string;

  email: string;

  location: string;

  stars: number;

  constructor(props: ExpertEntity) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.location = props.location;
    this.stars = props.stars;
  }
}
