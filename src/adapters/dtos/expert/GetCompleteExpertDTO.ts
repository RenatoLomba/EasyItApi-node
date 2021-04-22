import { ExpertEntity } from '../../../entities/ExpertEntity';
import { ExpertAvatarResult } from '../avatar/ExpertAvatarResult';
import { ServiceDTOResult } from '../service/ServiceDTOResult';
import { TestimonialDTOResult } from '../testimonial/TestimonialDTOResult';
import { ThumbnailResult } from '../thumbnail/ThumnailResult';

export class GetCompleteExpertDTO {
  id: string;

  name: string;

  email: string;

  location: string;

  stars: number;

  services: ServiceDTOResult[];

  thumbnails: ThumbnailResult[];

  avatar?: ExpertAvatarResult;

  testimonials?: TestimonialDTOResult[];

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
    if (props.avatar) {
      this.avatar = new ExpertAvatarResult(props.avatar);
    }
    this.testimonials = props.testimonials.length > 0
      ? props.testimonials.map((testimonial) => new TestimonialDTOResult(testimonial)) : [];
  }
}
