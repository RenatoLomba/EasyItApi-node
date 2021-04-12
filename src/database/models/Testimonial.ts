import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import Base from './Base';
import Expert from './Expert';
import User from './User';

@Entity('testimonials')
export class Testimonial extends Base {
  @Column()
  'user_id': string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  'expert_id': string;

  @ManyToOne(() => Expert, (expert) => expert.favorites)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @Column()
  description: string;

  @Column()
  stars: number;
}
