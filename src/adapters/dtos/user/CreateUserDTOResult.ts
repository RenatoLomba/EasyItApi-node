import { UserEntity } from '../../../entities/UserEntity';

export class CreateUserDTOResult {
  id: string;

  name: string;

  email: string;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
  }
}
