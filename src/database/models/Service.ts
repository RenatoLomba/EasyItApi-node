import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import Base from './Base';
import Expert from './Expert';

@Entity('services')
export default class Service extends Base {
  @Column()
  'expert_id': string;

  @ManyToOne(() => Expert, (expert) => expert.services)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
