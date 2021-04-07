import {
  Column, Entity, Unique,
} from 'typeorm';
import Base from './Base';
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
}

export default User;
