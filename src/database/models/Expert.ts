import {
  Column, Entity, OneToMany, Unique,
} from 'typeorm';
import Base from './Base';
import Favorite from './Favorite';

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

  constructor() {
    super();

    if (!this.stars) {
      this.stars = 0;
    }
  }
}
