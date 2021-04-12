import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Appointment } from './Appointment';
import Base from './Base';
import Expert from './Expert';

@Entity('services')
export default class Service extends Base {
  @Column()
  'expert_id': string;

  @ManyToOne(() => Expert, (expert) => expert.services)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
