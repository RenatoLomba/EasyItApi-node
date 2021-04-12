import { ExpertEntity } from '../../../entities/ExpertEntity';
import { ServiceDTOResult } from '../service/ServiceDTOResult';

export class GetCompleteExpertDTO {
  id: string;

  name: string;

  email: string;

  location: string;

  stars: number;

  services: ServiceDTOResult[];

  constructor(props: ExpertEntity) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.location = props.location;
    this.stars = props.stars;
    this.services = props.services.length > 0
      ? props.services.map((service) => new ServiceDTOResult(service)) : [];
  }
}
