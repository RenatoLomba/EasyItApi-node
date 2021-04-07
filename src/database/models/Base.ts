import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export default class Base {
  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn()
  'created_at': Date;

  @UpdateDateColumn()
  'updated_at': Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
