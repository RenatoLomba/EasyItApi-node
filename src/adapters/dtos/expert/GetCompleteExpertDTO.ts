import { ExpertEntity } from '../../../entities/ExpertEntity';
import { AvatarResult } from '../avatar/UserAvatarResult';
import { ServiceDTOResult } from '../service/ServiceDTOResult';
import { ThumbnailResult } from '../thumbnail/ThumnailResult';

export class GetCompleteExpertDTO {
  id: string;

  name: string;

  email: string;

  location: string;

  stars: number;

  services: ServiceDTOResult[];

  thumbnails: ThumbnailResult[];

  avatar?: AvatarResult;

  constructor(props: ExpertEntity) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.location = props.location;
    this.stars = props.stars;
    this.services = props.services.length > 0
      ? props.services.map((service) => new ServiceDTOResult(service)) : [];
    this.thumbnails = props.thumbnails.length > 0
      ? props.thumbnails.map((thumbnail) => new ThumbnailResult(thumbnail)) : [];
    this.avatar = props.avatar ? new AvatarResult(props.avatar) : null;
  }
}
