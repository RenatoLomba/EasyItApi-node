import { hash } from 'bcrypt';
import { UserEntity } from '../../entities/UserEntity';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { ICreateUserUseCase } from '../ICreateUserUseCase';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(user: ICreateUserDTO): Promise<UserEntity> {
    const userAlreadyExists = await this.userRepository.selectAsync(user.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const newUser = new UserEntity(user);
    newUser.password = await hash(newUser.password, 8);

    const userCreated = await this.userRepository.insertAsync(newUser);

    return userCreated;
  }
}
