import { Token } from '../../../entities/Token';
import { AppointmentDTOResult } from '../appointment/AppointmentDTOResult';
import { UserAvatarResult } from '../avatar/UserAvatarResult';
import { GetExpertsDTOResult } from '../expert/GetExpertsDTOResult';
import { FavoriteDTOResult } from '../favorite/FavoriteDTOResult';
import { ServiceDTOResult } from '../service/ServiceDTOResult';
import { TestimonialDTOResult } from '../testimonial/TestimonialDTOResult';

export class LoginDTOResult {
  id: string;

  name: string;

  email: string;

  token: string;

  expiresIn: string;

  favorites: FavoriteDTOResult[];

  testimonials: TestimonialDTOResult[];

  avatar?: UserAvatarResult;

  appointments?: AppointmentDTOResult[];

  constructor(token: Token) {
    this.id = token.user.id;
    this.name = token.user.name;
    this.email = token.user.email;
    this.token = token.token;
    this.expiresIn = token.expiresIn;
    this.favorites = token.user.favorites.length > 0 ? token.user.favorites.map((favorite) => (
      {
        id: favorite.id,
        expert_id: favorite.expert_id,
        user_id: favorite.user_id,
        expert: favorite.expert && new GetExpertsDTOResult(favorite.expert),
      } as FavoriteDTOResult
    )) : [];
    this.testimonials = token.user.testimonials.length > 0 ? token.user.testimonials
      .map((testimonial) => (
        {
          expert_id: testimonial.expert_id,
          user_id: testimonial.user_id,
          id: testimonial.id,
          stars: testimonial.stars,
          description: testimonial.description,
        } as TestimonialDTOResult
      )) : [];
    this.appointments = token.user.appointments.length > 0 ? token.user.appointments
      .map((appointment) => (
        {
          date: appointment.date,
          id: appointment.id,
          expert_id: appointment.expert_id,
          service_id: appointment.service_id,
          user_id: appointment.user_id,
          expert: appointment.expert && new GetExpertsDTOResult(appointment.expert),
          service: appointment.service && new ServiceDTOResult(appointment.service),
        } as AppointmentDTOResult
      )) : [];
    if (token.user.avatar) {
      this.avatar = new UserAvatarResult(token.user.avatar);
    }
  }
}
