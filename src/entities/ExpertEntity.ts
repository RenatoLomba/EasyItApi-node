export default class ExpertEntity {
  id?: string;

  'created_at'?: Date;

  'updated_at'?: Date;

  name: string;

  email: string;

  password: string;

  stars?: number;

  location: string;

  constructor(expert: ExpertEntity) {
    Object.assign(this, expert);
  }
}
