import {
  Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import Base from './Base';
import Expert from './Expert';

@Entity('expertAvatar')
export class ExpertAvatar extends Base {
  @Column()
  'expert_id': string;

  @OneToOne(() => Expert, (expert) => expert.avatar)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @Column({ name: 'image', type: 'mediumblob' })
  image: Buffer;

  @Column()
  'content_type': string;

  @Column()
  'original_name': string;

  @Column()
  'file_name': string;
}
