import { Column, Entity, Unique } from 'typeorm';
import Base from './Base';

@Entity('favorites')
export default class Favorite extends Base {
  @Column()
  'user_id': string;

  @Column()
  'expert_id': string;
}
