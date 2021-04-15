import {
  Column, Entity, OneToMany, OneToOne, Unique,
} from 'typeorm';
import { Appointment } from './Appointment';
import Base from './Base';
import { ExpertAvatar } from './ExpertAvatar';
import Favorite from './Favorite';
import Service from './Service';
import { Testimonial } from './Testimonial';
import { Thumbnail } from './Thumbnail';

@Entity('experts')
export default class Expert extends Base {
  @Unique('Email', ['email'])

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  stars: number;

  @Column()
  location: string;

  @OneToMany(() => Favorite, (favorite) => favorite.expert)
  favorites: Favorite[];

  @OneToMany(() => Service, (service) => service.expert)
  services: Service[];

  @OneToMany(() => Testimonial, (testimonial) => testimonial.expert)
  testimonials: Testimonial[];

  @OneToMany(() => Appointment, (appointment) => appointment.expert)
  appointments: Appointment[];

  @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.expert)
  thumbnails: Thumbnail[];

  @OneToOne(() => ExpertAvatar, (avatar) => avatar.expert)
  avatar: ExpertAvatar;

  constructor() {
    super();

    if (!this.stars) {
      this.stars = 0;
    }
  }
}
