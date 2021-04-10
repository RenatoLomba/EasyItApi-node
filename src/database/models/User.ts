import {
  Column, Entity, OneToMany, Unique,
} from 'typeorm';
import Base from './Base';
import Favorite from './Favorite';
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
}

export default User;
