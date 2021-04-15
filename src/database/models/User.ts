import {
  Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, Unique,
} from 'typeorm';
import { Appointment } from './Appointment';
import Base from './Base';
import Favorite from './Favorite';
import { Testimonial } from './Testimonial';
import { UserAvatar } from './UserAvatar';
// import { v4 as uuid } from 'uuid';

@Entity('users')
class User extends Base {
  @Unique('email', ['email'])

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

  @OneToOne(() => UserAvatar, (userAvatar) => userAvatar.user)
  avatar: UserAvatar;
}

export default User;
