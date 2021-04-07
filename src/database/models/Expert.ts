import { Column, Entity, Unique } from 'typeorm';
import Base from './Base';

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

  constructor() {
    super();

    if (!this.stars) {
      this.stars = 0;
    }
  }
}
