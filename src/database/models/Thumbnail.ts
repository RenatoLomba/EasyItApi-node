import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import Base from './Base';
import Expert from './Expert';

@Entity('thumbnails')
export class Thumbnail extends Base {
  @Column()
  'expert_id': string;

  @ManyToOne(() => Expert, (expert) => expert.thumbnails)
  @JoinColumn({ name: 'expert_id' })
  expert: Expert;

  @Column({ name: 'image', type: 'mediumblob' })
  image: Buffer;

  @Column()
  'content_type': string;

  @Column()
  'original_name': string;
}
