import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import Base from './Base';
import Expert from './Expert';
import Service from './Service';
import User from './User';

@Entity('appointments')
export class Appointment extends Base {
  @Column()
  'user_id': string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  'expert_id': string;

  @ManyToOne(() => Expert, (expert) => expert.appointments)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @Column()
  'service_id': string;

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column()
  date: Date;
}
