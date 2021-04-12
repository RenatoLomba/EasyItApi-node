import {
  Column, Entity, OneToMany, Unique,
} from 'typeorm';
import { Appointment } from './Appointment';
import Base from './Base';
import Favorite from './Favorite';
import { Testimonial } from './Testimonial';
// import { v4 as uuid } from 'uuid';

@Entity('users')
class User extends Base {
  @Unique('Email', ['email'])

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
  testimonials: Testimonial[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}

export default User;
