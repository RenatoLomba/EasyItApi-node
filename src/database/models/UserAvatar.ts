import {
  Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import Base from './Base';
import User from './User';

@Entity('userAvatar')
export class UserAvatar extends Base {
  @Column()
  'user_id': string;

  @OneToOne(() => User, (user) => user.avatar)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'image', type: 'mediumblob' })
  image: Buffer;

  @Column()
  'content_type': string;

  @Column()
  'original_name': string;

  @Column()
  'file_name': string;
}
